import { Box, Button, Input, ScrollView } from 'native-base';
import React, { useState, useContext, useEffect } from 'react';
import theme from '../../themes/theme';
import { StyleSheet } from 'react-native';
import { MatrixContext } from '../../context/matrixContext';
import { navigate } from '../../utils/navigation';
import { useAppDispatch } from '../../hooks/useDispatch';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
} from '../../store/actions/mainActions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackModel } from '../../types/rootStackType';
import { IMessagesChunk } from '../../types/roomInitialSync';
import RoomHeader from './components/RoomHeader';

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
  const [messages, setMessages] = useState<IMessagesChunk>();

  useEffect(() => {
    if (props.route.params.roomId) {
      initialRoomSync(props.route.params.roomId);
    }
  }, [props.route.params.roomId]);

  useEffect(() => {
    if (!matrixContext.instance) {
      navigate('Home');
    }
  }, [matrixContext.instance]);

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
        roomId: props.route.params.roomId,
        name: props.route.params.roomName,
      });
    }

    matrixContext.instance
      ?.roomInitialSync(roomId, 10)
      .then(res => {
        setMessages(res.messages);
      })
      .catch(err => {
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
    matrixContext.instance
      ?.sendMessage(roomData.roomId, {
        msgtype: 'm.text',
        body: message,
      })
      .then(() => {
        setMessage('');
      })
      .catch(err => {
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

  return (
    <>
      <RoomHeader name={roomData.name} avatar={roomData.avatar} />
      <ScrollView
        contentContainerStyle={styles.container}
        p={4}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        <Box style={styles.inner}>
          <Input
            mb={4}
            fontSize="md"
            w="100%"
            variant="unstyled"
            placeholder="Message"
            value={message}
            onChangeText={changeMessage}
          />
          <Button onPress={sendMessage}>Send</Button>
        </Box>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});

export default RoomItem;
