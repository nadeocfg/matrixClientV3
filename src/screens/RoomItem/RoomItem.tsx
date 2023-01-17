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
  EventTimeline,
  IContent,
  IEvent,
  MatrixEvent,
  Room,
} from 'matrix-js-sdk';
import {
  Keyboard,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  LayoutChangeEvent,
} from 'react-native';
import MessageItem from '../../components/MessageItem';
import {
  ArrowUpIcon,
  CameraIcon,
  CloseIcon,
  CloseSquareIcon,
  FileIcon,
  GalleryIcon,
  LocationIcon,
  MicIcon,
  PlusIcon,
  ReplyIcon,
} from '../../components/icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker, { types } from 'react-native-document-picker';
import { useAppSelector } from '../../hooks/useSelector';
import { StoreModel } from '../../types/storeTypes';
import { setNeedUpdateCurrentRoom } from '../../store/actions/roomsActions';
import sanitizeText from '../../utils/sanitizeText';
import Animated from 'react-native-reanimated';

const RoomItem = (
  props: NativeStackScreenProps<RootStackModel, 'RoomItem'>,
) => {
  const dispatch = useAppDispatch();
  const matrixContext = useContext(MatrixContext);
  const { colorMode } = useColorMode();
  const [isAttachmentsVisible, setIsAttachmentsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState<Partial<IEvent> | null>(
    null,
  );
  const [roomData, setRoomData] = useState({
    fullAvatar: '',
    avatar: '',
    name: '',
    roomId: '',
    membership: '',
  });
  const [isBackward, setIsBackward] = useState(false);
  const [timeline, setTimeline] = useState<MatrixEvent[]>();
  const [currentTimeline, setCurrentTimeline] = useState<
    EventTimeline | undefined
  >(undefined);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const inputRef = useRef<any>(null);
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
      scrollToBottom();
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      scrollToBottom();
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
    const addNewMessages = (event: MatrixEvent, room: Room) => {
      console.log('Timeline update');

      if (event.event.room_id === props.route.params.roomId) {
        setTimeline([...room.timeline]);

        scrollViewRef.current?.scrollToEnd();
      }
    };

    matrixContext.instance?.on('Room.timeline', addNewMessages);

    return () => {
      matrixContext.instance?.removeListener('Room.timeline', addNewMessages);
    };
  }, []);

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

    const currentTl = roomInfo.getUnfilteredTimelineSet();

    matrixContext.instance
      ?.getEventTimeline(
        currentTl,
        roomInfo.timeline[roomInfo.timeline.length - 1]?.event.event_id || '',
      )
      .then(res => {
        if (res?.getEvents().length !== 0) {
          setTimeline(res?.getEvents() || []);
          setCurrentTimeline(res);
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
      })
      .finally(() => {
        scrollToBottom();
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

    const content: IContent = {
      body: message,
      msgtype: 'm.text',
    };

    if (replyMessage) {
      content['m.relates_to'] = {
        'm.in_reply_to': {
          event_id: replyMessage.event_id || '',
        },
      };

      // Check if replied message is reply also
      if (replyMessage.content && replyMessage.content['m.relates_to']) {
        // Send only reply message text, without old replies
        const splitMessage = replyMessage.content?.body.split('\n\n');

        content.body = `> <${replyMessage.sender}> ${splitMessage[1]}\n\n${content.body}`;
      } else {
        content.body = `> <${
          replyMessage.sender
        }> ${replyMessage.content?.body?.replace(/\n/g, '\n> ')}\n\n${
          content.body
        }`;
      }

      const replyToLink = `<a href="https://matrix.to/#/${encodeURIComponent(
        roomData.roomId,
      )}/${encodeURIComponent(replyMessage.event_id || '')}">In reply to</a>`;
      const userLink = `<a href="https://matrix.to/#/${encodeURIComponent(
        replyMessage.sender || '',
      )}">${sanitizeText(replyMessage.sender || '')}</a>`;
      const fallback = `<mx-reply><blockquote>${replyToLink}${userLink}<br />${
        replyMessage.content?.formattedBody ||
        sanitizeText(replyMessage.content?.body)
      }</blockquote></mx-reply>`;
      content.formatted_body = fallback + message;
    }

    matrixContext.instance
      ?.sendMessage(roomData.roomId, content)
      .then(() => {
        setMessage('');
        setReplyMessage(null);
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
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isBottom =
      Math.floor(contentSize.height - contentOffset.y) ===
      Math.floor(layoutMeasurement.height);
    const isTop = contentOffset.y <= 0;

    if (isTop) {
      fetchMessages();
      return;
    }

    // if (isBottom) {
    //   fetchMessages(false);
    // }
  };

  const fetchMessages = (backwards = true) => {
    if (isLoadingMessages) {
      return;
    }

    console.log(currentTimeline);

    if (!currentTimeline) {
      return;
    }

    setIsBackward(backwards);

    setIsLoadingMessages(true);

    matrixContext.instance
      ?.paginateEventTimeline(currentTimeline, {
        backwards,
        limit: 20,
      })
      .catch(err => {
        console.log({ ...err });
      })
      .finally(() => {
        setIsLoadingMessages(false);
      });
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current?.scrollToEnd();
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
    scrollToBottom();
    setReplyMessage(null);
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

  const scrollToMessage = (eventId: string, events: MatrixEvent[]) => {
    const index = events.findIndex(event => event.event.event_id === eventId);

    scrollViewRef.current?.scrollTo({
      y: index * 100,
      animated: true,
    });
  };

  const onReplyLongPress = (event: Partial<IEvent>) => {
    console.log(event);
    setReplyMessage(event);
    inputRef.current?.focus();
  };

  const onReplyPress = (event: Partial<IEvent>) => {
    const room = matrixContext.instance?.getRoom(roomData.roomId);
    const timelineSet = room?.getUnfilteredTimelineSet();

    if (timelineSet) {
      setIsLoadingMessages(true);
      matrixContext.instance
        ?.getEventTimeline(
          timelineSet,
          event.content?.['m.relates_to']?.['m.in_reply_to']?.event_id || '',
        )
        .then(res => {
          const events = res?.getEvents();
          setTimeline(events);
          setCurrentTimeline(res);

          scrollToMessage(
            event.content?.['m.relates_to']?.['m.in_reply_to']?.event_id || '',
            events || [],
          );
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
    }
  };

  const clearReply = () => {
    setReplyMessage(null);
  };

  const getReplyMessageType = (msgType: string | undefined) => {
    if (msgType === 'm.text') {
      let prevMessage =
        (replyMessage?.content?.body?.length > 40
          ? replyMessage?.content?.body
              ?.replaceAll('\n', ' ')
              .substring(0, 39) + '...'
          : replyMessage?.content?.body?.replaceAll('\n', ' ')) || '';

      if (replyMessage?.content?.['m.relates_to']) {
      }

      return prevMessage;
    }

    return '';
  };

  const getReplyName = () => {
    return matrixContext.instance?.getUser(replyMessage?.sender || '')
      ?.displayName;
  };

  const onLayout = (eventId: string) => (event: LayoutChangeEvent) => {
    console.log(eventId);
    console.log(event.nativeEvent.layout.height);
  };

  const ReplyBox = () => {
    return (
      <Flex
        direction="row"
        align="center"
        style={replyBox.wrapper}
        p={2}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        <Box flexBasis="10%">
          <ReplyIcon
            color={colorMode === 'light' ? theme.greyIcon : theme.white}
          />
        </Box>

        <Box style={replyBox.content}>
          <Text color={theme.primary}>Reply to {getReplyName()}</Text>
          {getReplyMessageType(replyMessage?.content?.msgtype)}
        </Box>

        <IconButton
          onPress={clearReply}
          w={8}
          h={8}
          icon={
            <CloseIcon
              color={colorMode === 'light' ? theme.greyIcon : theme.white}
            />
          }
        />
      </Flex>
    );
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
        {isLoadingMessages && isBackward && (
          <Spinner mt={4} accessibilityLabel="Loading messages" />
        )}
      </Box>

      <ScrollView
        onContentSizeChange={(width, height) => {}}
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

        {(timeline || []).map((matrixEvent, index) => (
          <MessageItem
            onLayout={onLayout(matrixEvent.event.event_id || '')}
            onReplyPress={onReplyPress}
            onReplyLongPress={onReplyLongPress}
            matrixEvent={matrixEvent}
            userId={matrixContext.instance?.getUserId()}
            isPrevSenderSame={
              matrixEvent.event.sender ===
              (timeline || [])[index - 1]?.event.sender
            }
            key={matrixEvent.event.event_id}
          />
        ))}
      </ScrollView>

      <Box
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        {isLoadingMessages && !isBackward && (
          <Spinner mt={4} accessibilityLabel="Loading messages" />
        )}
      </Box>

      {/* Scroll to bottom button
      <Box style={arrowDownButton.wrapper}>
        <IconButton
          width={12}
          height={12}
          variant="ghost"
          icon={<ArrowDownIcon />}
        />
      </Box> */}

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
          {replyMessage && <ReplyBox />}
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
              ref={inputRef}
              isFocused={true}
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

const replyBox = StyleSheet.create({
  wrapper: {
    paddingVertical: 4,
  },
  content: {
    paddingLeft: 8,
    paddingRight: 4,
    flexBasis: '80%',
    flexGrow: 1,
    borderLeftWidth: 1,
    borderLeftColor: theme.primary,
  },
});

const arrowDownButton = StyleSheet.create({
  wrapper: {
    zIndex: 9999,
    position: 'absolute',
    bottom: '10%',
    right: 12,
    backgroundColor: theme.greyLight,
  },
});

export default RoomItem;
