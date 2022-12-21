import { Box, IPressableProps, Pressable, Text } from 'native-base';
import React from 'react';

type RoomListItemProps = {
  name: string;
  message: string;
  roomId: string;
  onSelectRoom: (roomId: string) => void;
} & IPressableProps;

const RoomListItem = ({
  name,
  message,
  roomId,
  onSelectRoom,
  ...props
}: RoomListItemProps) => {
  return (
    <Pressable onPress={() => onSelectRoom(roomId)} {...props}>
      {({ isPressed }) => {
        return (
          <Box
            borderWidth={1}
            p={2}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.98 : 1,
                },
              ],
            }}>
            <Text fontSize={16}>{name}</Text>
            <Text fontSize={12}>{message}</Text>
          </Box>
        );
      }}
    </Pressable>
  );
};

export default RoomListItem;
