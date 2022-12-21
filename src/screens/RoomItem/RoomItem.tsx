import { Box, Button, Center, Heading, Input, ScrollView } from 'native-base';
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

const RoomItem = (
  props: NativeStackScreenProps<RootStackModel, 'RoomItem'>,
) => {
  const dispatch = useAppDispatch();
  const matrixContext = useContext(MatrixContext);
  const [currentRoomId, setCurrentRoomId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setCurrentRoomId(props.route.params.roomId || '');
  }, [props.route.params.roomId]);

  useEffect(() => {
    if (!matrixContext.instance) {
      navigate('Home');
    }
  }, [matrixContext.instance]);

  const changeRoomId = (value: string) => setCurrentRoomId(value);
  const changeMessage = (value: string) => setMessage(value);

  const sendMessage = () => {
    matrixContext.instance
      ?.sendMessage(currentRoomId, {
        msgtype: 'm.text',
        body: message,
      })
      .catch(err => {
        if (err.event?.error?.message) {
          dispatch(
            setActionsDrawerContent({
              title: 'Error',
              text: err.event.error.message,
              actions: [
                {
                  title: 'Close',
                  onPress: () => dispatch(setActionsDrawerVisible(false)),
                },
              ],
            }),
          );

          dispatch(setActionsDrawerVisible(true));

          return;
        }

        dispatch(
          setActionsDrawerContent({
            title: err.data?.errcode || '',
            text: err.data?.error || 'Something went wrong',
            actions: [
              {
                title: 'Close',
                onPress: () => dispatch(setActionsDrawerVisible(false)),
              },
            ],
          }),
        );

        dispatch(setActionsDrawerVisible(true));
      });
  };

  return (
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
        <Center mb={12}>
          <Heading>Send message</Heading>
        </Center>

        <Input
          mb={4}
          fontSize="md"
          w="100%"
          variant="unstyled"
          placeholder="Room ID"
          value={currentRoomId}
          onChangeText={changeRoomId}
        />

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
