import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Input,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  useColorMode,
} from 'native-base';
import React, { useState, useContext, useEffect, useRef } from 'react';
import theme from '../../themes/theme';
import { MatrixContext } from '../../context/matrixContext';
import { navigate } from '../../utils/navigation';
import { useAppDispatch } from '../../hooks/useDispatch';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
} from '../../store/actions/mainActions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackModel } from '../../types/rootStackType';
import RoomHeader from './components/RoomHeader';
import {
  Direction,
  IContent,
  IEventWithRoomId,
  MatrixEvent,
} from 'matrix-js-sdk';
import {
  Keyboard,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import MessageItem from '../../components/MessageItem';
import {
  ArrowUpIcon,
  CameraIcon,
  CloseSquareIcon,
  FileIcon,
  GalleryIcon,
  LocationIcon,
  MicIcon,
  PlusIcon,
} from '../../components/icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker, { types } from 'react-native-document-picker';
import { useAppSelector } from '../../hooks/useSelector';
import { StoreModel } from '../../types/storeTypes';
import { setNeedUpdateCurrentRoom } from '../../store/actions/roomsActions';
import { RoomEventInterface } from '../../types/roomEventInterface';

const RoomItem = (
  props: NativeStackScreenProps<RootStackModel, 'RoomItem'>,
) => {
  const dispatch = useAppDispatch();
  const matrixContext = useContext(MatrixContext);
  const { colorMode } = useColorMode();
  const [isAttachmentsVisible, setIsAttachmentsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [replyId, setReplyId] = useState('');
  const [roomData, setRoomData] = useState({
    fullAvatar: '',
    avatar: '',
    name: '',
    roomId: '',
    membership: '',
  });
  const [timeline, setTimeline] = useState<{
    start?: string | undefined;
    end?: string | undefined;
    chunk: RoomEventInterface[];
  }>({
    chunk: [],
  });
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const scrollViewRef = useRef<any>(null);
  const needUpdateCurrentRoom = useAppSelector(
    (state: StoreModel) => state.roomsStore.needUpdateCurrentRoom,
  );

  useEffect(() => {
    console.log('mounted');

    if (props.route.params.roomId) {
      initialRoomSync(props.route.params.roomId);
    }
  }, []);

  useEffect(() => {
    console.log('need update');

    if (props.route.params.roomId && needUpdateCurrentRoom) {
      initialRoomSync(props.route.params.roomId);
    }
  }, [needUpdateCurrentRoom]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      scrollToTop();
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      scrollToTop();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!matrixContext.instance) {
      navigate('Home');
    }
  }, [matrixContext.instance]);

  useEffect(() => {
    const addNewMessages = (event: MatrixEvent) => {
      console.log(event);
      if (event.event.room_id === props.route.params.roomId) {
        setTimeline({
          chunk: [...timeline.chunk, event.event as RoomEventInterface],
        });

        scrollViewRef.current?.scrollToEnd();
      }
    };

    matrixContext.instance?.on('Room.timeline', addNewMessages);

    return () => {
      matrixContext.instance?.removeListener('Room.timeline', addNewMessages);
    };
  }, [timeline, matrixContext.instance]);

  const initialRoomSync = async (roomId: string) => {
    const roomInfo = await matrixContext.instance?.getRoom(roomId);

    console.log(roomInfo);

    if (roomInfo) {
      const avatarUrl = roomInfo.getAvatarUrl(
        matrixContext.instance?.baseUrl || '',
        48,
        48,
        'crop',
      );

      const fullAvatarUrl = matrixContext.instance?.mxcUrlToHttp(
        roomInfo.getMxcAvatarUrl() || '',
      );

      setRoomData({
        avatar: avatarUrl || '',
        fullAvatar: fullAvatarUrl || '',
        roomId: roomId,
        name: roomInfo.name || props.route.params.roomName,
        membership: roomInfo?.getMyMembership(),
      });
    } else {
      setRoomData({
        avatar: props.route.params.avatarUrl,
        fullAvatar: props.route.params.avatarUrl,
        roomId: roomId,
        name: props.route.params.roomName,
        membership: '',
      });
    }

    if (roomInfo?.getMyMembership() !== 'join') {
      return;
    }

    dispatch(setNeedUpdateCurrentRoom(false));

    matrixContext.instance
      ?.roomInitialSync(roomId, 20)
      .then(res => {
        if (res.messages) {
          setTimeline(res.messages);
          setFullyRead();
        }
      })
      .catch(err => {
        console.log({ ...err });
        dispatch(
          setActionsDrawerContent({
            title: err.data?.errcode || '',
            text: err.data?.error || 'Something went wrong',
          }),
        );

        dispatch(setActionsDrawerVisible(true));
      });
  };

  const setFullyRead = async () => {
    if (matrixContext.instance) {
      const room = matrixContext.instance.getRoom(props.route.params.roomId);

      if (!room) {
        return;
      }

      const liveTimeline = room.getLiveTimeline().getEvents();

      if (liveTimeline.length === 0) {
        return;
      }

      const latestEvent = liveTimeline[liveTimeline.length - 1];

      if (latestEvent === null) {
        return;
      }

      await matrixContext.instance.sendReadReceipt(latestEvent);
    }
  };

  const changeMessage = (value: string) => setMessage(value);

  const sendMessage = () => {
    if (!message.trim()) {
      return;
    }

    matrixContext.instance
      ?.sendMessage(roomData.roomId, {
        msgtype: 'm.text',
        body: message,
      })
      .then(() => {
        setMessage('');
      })
      .catch(err => {
        console.log({ ...err });
        if (err.event?.error?.message) {
          dispatch(
            setActionsDrawerContent({
              title: 'Error',
              text: err.event.error.message,
            }),
          );

          dispatch(setActionsDrawerVisible(true));

          return;
        }

        dispatch(
          setActionsDrawerContent({
            title: err.data?.errcode || '',
            text: err.data?.error || 'Something went wrong',
          }),
        );

        dispatch(setActionsDrawerVisible(true));
      });
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y <= 0) {
      fetchPrevMessages();
    }
  };

  const fetchPrevMessages = () => {
    if (isLoadingMessages || !timeline.start) {
      return;
    }

    setIsLoadingMessages(true);

    matrixContext.instance
      ?.createMessagesRequest(
        props.route.params.roomId,
        timeline.start,
        20,
        Direction.Backward,
      )
      .then(res => {
        setTimeline({
          start: res.end,
          chunk: res.chunk
            .reverse()
            .concat(timeline.chunk) as IEventWithRoomId[],
        });
      })
      .catch(err => {
        console.log({ ...err });
        dispatch(
          setActionsDrawerContent({
            title: err.data?.errcode || '',
            text: err.data?.error || 'Something went wrong',
          }),
        );

        dispatch(setActionsDrawerVisible(true));
      })
      .finally(() => {
        setIsLoadingMessages(false);
      });
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd();
    }
  };

  const onJoin = () => {
    dispatch(setLoader(true));

    matrixContext.instance
      ?.joinRoom(roomData.roomId)
      .then(() => {
        setTimeout(() => {
          initialRoomSync(props.route.params.roomId);
          dispatch(setLoader(false));
        }, 1000);
      })
      .catch(err => {
        console.log({ ...err });

        dispatch(
          setActionsDrawerContent({
            title: err.data?.errcode || '',
            text: err.data?.error || 'Something went wrong',
          }),
        );

        dispatch(setActionsDrawerVisible(true));

        dispatch(setLoader(false));
      });
  };

  const onLeave = (forget = false) => {
    dispatch(setLoader(true));

    matrixContext.instance
      ?.leave(roomData.roomId)
      .then(() => {
        if (forget) {
          matrixContext.instance?.forget(roomData.roomId).catch(err => {
            console.log({ ...err });

            dispatch(
              setActionsDrawerContent({
                title: err.data?.errcode || '',
                text: err.data?.error || 'Something went wrong',
              }),
            );

            dispatch(setActionsDrawerVisible(true));
          });
        }

        navigate('RoomList');
      })
      .catch(err => {
        console.log({ ...err });

        dispatch(
          setActionsDrawerContent({
            title: err.data?.errcode || '',
            text: err.data?.error || 'Something went wrong',
          }),
        );

        dispatch(setActionsDrawerVisible(true));
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  const openAttachments = () => {
    setIsAttachmentsVisible(!isAttachmentsVisible);
    scrollToTop();
  };

  const openCamera = (type: 'video' | 'photo' = 'photo') => {
    launchCamera({
      mediaType: type,
      includeExtra: true,
      saveToPhotos: true,
    })
      .then(res => {
        if (res.assets && res.assets.length > 0) {
          console.log(res.assets[0]);
          uploadContent(res.assets[0]);
          openAttachments();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'mixed', includeExtra: true })
      .then(res => {
        if (res.assets && res.assets.length > 0) {
          console.log(res.assets[0]);
          uploadContent(res.assets[0]);
          openAttachments();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const openFilesystem = () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: types.allFiles,
    })
      .then(res => {
        if (res.length > 0) {
          uploadContent(res[0]);
        }
      })
      .catch(err => {
        console.log({ ...err });

        if (err.code === 'DOCUMENT_PICKER_CANCELED') {
          return;
        }

        dispatch(
          setActionsDrawerContent({
            title: err.code || '',
            text: err.message || 'Something went wrong',
          }),
        );

        dispatch(setActionsDrawerVisible(true));
      });
  };

  const uploadContent = async (file: any) => {
    if (!file) {
      return;
    }

    const [type] = file.type?.split('/') || [];

    const info = {
      mimetype: file.type,
      size: file.size || file.fileSize || 0,
    };

    const content: IContent = { info };

    if (type === 'image') {
      content.msgtype = 'm.image';
      content.body = file.name || file.fileName || 'Image';
    } else if (type === 'video') {
      content.msgtype = 'm.video';
      content.body = file.name || file.fileName || 'Video';
    } else {
      content.msgtype = 'm.file';
      content.body = file.name || file.fileName || 'Video';
    }

    const uploadData = await matrixContext.instance?.uploadContent(file, {
      onlyContentUri: false,
    });

    if (uploadData) {
      content.url = uploadData?.content_uri || '';

      matrixContext.instance
        ?.sendMessage(props.route.params.roomId, content)
        .then(() => {
          openAttachments();
        })
        .catch(err => {
          console.log({ ...err });

          dispatch(
            setActionsDrawerContent({
              title: err.data?.errcode || '',
              text: err.data?.error || 'Something went wrong',
            }),
          );

          dispatch(setActionsDrawerVisible(true));
        });
    }
  };

  return (
    <>
      <RoomHeader
        roomId={props.route.params.roomId}
        name={roomData.name}
        avatar={roomData.avatar}
        membership={roomData.membership}
      />

      <Box
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        {isLoadingMessages && (
          <Spinner mt={4} accessibilityLabel="Loading messages" />
        )}
      </Box>

      <ScrollView
        onContentSizeChange={
          timeline.chunk.length <= 20 ? scrollToTop : () => {}
        }
        onScroll={onScroll}
        _contentContainerStyle={{ paddingBottom: 4 }}
        flex={1}
        ref={scrollViewRef}
        px={4}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        {roomData.membership === 'invite' && (
          <Center>
            <Text flex={1} fontSize={16} mb={4} mt={8}>
              Do you want to join <Text fontWeight={600}>{roomData.name}</Text>?
            </Text>
            <Flex flexDirection="row" align="center">
              <Button variant="outline" mr={2} onPress={() => onLeave(true)}>
                Reject
              </Button>
              <Button variant="subtle" colorScheme="primary" onPress={onJoin}>
                Join
              </Button>
            </Flex>
          </Center>
        )}

        {timeline.chunk.map((timelineItem, index) => (
          <MessageItem
            event={timelineItem}
            userId={matrixContext.instance?.getUserId()}
            isPrevSenderSame={
              timelineItem.sender === timeline.chunk[index - 1]?.sender
            }
            key={timelineItem.event_id}
          />
        ))}
      </ScrollView>

      {roomData.membership !== 'join' &&
        roomData.membership !== 'ban' &&
        roomData.membership !== 'invite' && (
          <Flex align="center" p={2}>
            <Button width="100%" onPress={onJoin}>
              Join
            </Button>
          </Flex>
        )}

      {roomData.membership === 'join' && (
        <>
          <Flex
            direction="row"
            align="center"
            p={2}
            _light={{
              bg: theme.light.bgColor,
            }}
            _dark={{
              bg: theme.dark.bgColor,
            }}>
            <IconButton
              onPress={openAttachments}
              w={8}
              h={8}
              icon={
                isAttachmentsVisible ? (
                  <CloseSquareIcon color={theme.primary} />
                ) : (
                  <PlusIcon
                    color={colorMode === 'light' ? theme.greyIcon : theme.white}
                  />
                )
              }
            />

            <Input
              py={1}
              px={3}
              mx={1}
              variant="message"
              borderRadius="full"
              flexBasis="80%"
              flexGrow={1}
              fontSize="sm"
              placeholder="Message"
              value={message}
              onChangeText={changeMessage}
            />
            {message ? (
              <IconButton
                onPress={sendMessage}
                w={8}
                h={8}
                icon={<ArrowUpIcon color={theme.primary} />}
              />
            ) : (
              <IconButton
                w={8}
                h={8}
                icon={
                  <MicIcon
                    color={colorMode === 'light' ? theme.greyIcon : theme.white}
                  />
                }
              />
            )}
          </Flex>
          {isAttachmentsVisible && (
            <Box
              style={buttonStyles.wrapper}
              _light={{
                bg: theme.light.bgColor,
              }}
              _dark={{
                bg: theme.dark.bgColor,
              }}>
              <Pressable
                style={buttonStyles.button}
                onPress={() => openCamera('photo')}>
                <CameraIcon
                  color={
                    colorMode === 'light' ? theme.light.text : theme.dark.text
                  }
                  secondColor={
                    colorMode === 'light' ? theme.white : theme.dark.bgColor
                  }
                />
                <Text>Camera</Text>
              </Pressable>
              <Pressable style={buttonStyles.button} onPress={openGallery}>
                <GalleryIcon
                  color={
                    colorMode === 'light' ? theme.light.text : theme.dark.text
                  }
                />
                <Text>Gallery</Text>
              </Pressable>
              <Pressable style={buttonStyles.button} onPress={openFilesystem}>
                <FileIcon
                  color={
                    colorMode === 'light' ? theme.light.text : theme.dark.text
                  }
                  secondColor={
                    colorMode === 'light' ? theme.white : theme.dark.bgColor
                  }
                />
                <Text>File</Text>
              </Pressable>
              <Pressable
                style={[buttonStyles.button, buttonStyles.lastButton]}
                onPress={() => {}}>
                <LocationIcon
                  color={
                    colorMode === 'light' ? theme.light.text : theme.dark.text
                  }
                />
                <Text>Location</Text>
              </Pressable>
            </Box>
          )}
        </>
      )}
    </>
  );
};

const buttonStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '20%',
    flexGrow: 1,
    marginRight: 8,
    paddingVertical: 12,
    backgroundColor: theme.light.input.outline.bgColor,
    borderRadius: 8,
  },
  lastButton: {
    marginRight: 0,
  },
});

export default RoomItem;
