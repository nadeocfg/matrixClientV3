import { Button, Flex, Input, ScrollView } from 'native-base';
import React, { useState, useContext, useEffect, useRef } from 'react';
import theme from '../../themes/theme';
import { MatrixContext } from '../../context/matrixContext';
import { navigate } from '../../utils/navigation';
import { useAppDispatch } from '../../hooks/useDispatch';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
} from '../../store/actions/mainActions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackModel } from '../../types/rootStackType';
import RoomHeader from './components/RoomHeader';
import { IEventWithRoomId, MatrixEvent } from 'matrix-js-sdk';
import { Keyboard } from 'react-native';
import MessageItem from '../../components/MessageItem';

const RoomItem = (
  props: NativeStackScreenProps<RootStackModel, 'RoomItem'>,
) => {
  const dispatch = useAppDispatch();
  const matrixContext = useContext(MatrixContext);
  const [message, setMessage] = useState('');
  const [roomData, setRoomData] = useState({
    fullAvatar: '',
    avatar: '',
    name: '',
    roomId: '',
  });
  const [timeline, setTimeline] = useState<{
    start?: string | undefined;
    end?: string | undefined;
    chunk: IEventWithRoomId[];
  }>({
    chunk: [],
  });
  const scrollViewRef = useRef<any>(null);

  useEffect(() => {
    if (props.route.params.roomId) {
      initialRoomSync(props.route.params.roomId);

      matrixContext.instance
        ?.getJoinedRoomMembers(props.route.params.roomId)
        .then(res => {
          console.log(res);
        });

      matrixContext.instance?.members(props.route.params.roomId).then(res => {
        console.log(res);
      });
    }
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      onSizeChange();
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      onSizeChange();
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
      setTimeline({
        chunk: [...timeline.chunk, event.event as IEventWithRoomId],
      });
    };

    matrixContext.instance?.on('Room.timeline', addNewMessages);

    return () => {
      matrixContext.instance?.removeListener('Room.timeline', addNewMessages);
    };
  }, [timeline, matrixContext.instance]);

  const initialRoomSync = async (roomId: string) => {
    const roomInfo = await matrixContext.instance?.getRoom(roomId);
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
        name: props.route.params.roomName,
      });
    }

    matrixContext.instance
      ?.roomInitialSync(roomId, 20)
      .then(res => {
        console.log(res.messages);
        if (res.messages) {
          setTimeline(res.messages);
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

  const onSizeChange = () => {
    scrollViewRef.current?.scrollToEnd();
  };

  return (
    <>
      <RoomHeader name={roomData.name} avatar={roomData.avatar} />
      <ScrollView
        flex={1}
        ref={scrollViewRef}
        onContentSizeChange={onSizeChange}
        px={4}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        {timeline.chunk.map(timelineItem => (
          <MessageItem
            event={timelineItem}
            userId={matrixContext.instance?.getUserId()}
            key={timelineItem.event_id}
          />
        ))}
      </ScrollView>
      <Flex direction="row" align="center" p={2}>
        <Input
          flexBasis="80%"
          flexGrow={1}
          fontSize="sm"
          variant="unstyled"
          placeholder="Message"
          value={message}
          onChangeText={changeMessage}
        />
        <Button ml={2} onPress={sendMessage}>
          Send
        </Button>
      </Flex>
    </>
  );
};

export default RoomItem;
