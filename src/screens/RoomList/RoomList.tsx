import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
} from 'native-base';
import React from 'react';
import { useAppSelector } from '../../hooks/useSelector';
import theme from '../../themes/theme';
import { StoreModel } from '../../types/storeTypes';
import { StyleSheet } from 'react-native';

const RoomList = () => {
  const roomList = useAppSelector(
    (state: StoreModel) => state.roomsStore.rooms,
  );

  if (roomList.length === 0) {
    return (
      <Center
        style={styles.container}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        <Heading>No active chats</Heading>
      </Center>
    );
  }

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
      <Center mb={4}>
        <Heading>Chat List</Heading>
      </Center>

      {roomList.map(item => (
        <Box key={item.roomId} borderWidth={1} mb={2} p={2}>
          <Text fontSize={16}>{item.name}</Text>
          <Text fontSize={12}>
            {item.timeline[item.timeline.length - 1].event.type ===
            'm.room.message'
              ? item.timeline[item.timeline.length - 1].event.content?.body
              : '...'}
          </Text>
        </Box>
      ))}
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

export default RoomList;
