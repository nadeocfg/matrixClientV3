import { Box, Button, Center, Heading, Input, ScrollView } from 'native-base';
import React, { useState, useContext, useEffect } from 'react';
import theme from '../../themes/theme';
import { StyleSheet } from 'react-native';
import { MatrixContext } from '../../context/matrixContext';
import { navigate } from '../../utils/navigation';

const RoomItem: React.FC = () => {
  const matrixContext = useContext(MatrixContext);
  const [roomId, setRoomId] = useState('!BvsFQCHpiKgoYFAwVS:matrix.org');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!matrixContext.instance) {
      navigate('Home');
    }
  }, [matrixContext.instance]);

  const changeRoomId = (value: string) => setRoomId(value);
  const changeMessage = (value: string) => setMessage(value);

  const sendMessage = () => {
    matrixContext.instance?.sendMessage(roomId, {
      msgtype: 'm.text',
      body: message,
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
          value={roomId}
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
