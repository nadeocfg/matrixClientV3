import { Box, Text } from 'native-base';
import React from 'react';
import formatTime from '../utils/formatTime';
import { IEventWithRoomId } from 'matrix-js-sdk';
import { StyleSheet } from 'react-native';
import theme from '../themes/theme';

interface MessageItemProps {
  event: IEventWithRoomId;
  userId: string | null | undefined;
}

const MessageItem = ({ event, userId }: MessageItemProps) => {
  console.log(userId);

  if (event.type === 'm.room.message') {
    return (
      <Box key={event.event_id} style={styles.messageWrapper}>
        <Text color={theme.light.button.primary.textColor} fontSize="xs">
          {event.sender}
        </Text>
        <Text color={theme.light.button.primary.textColor} fontSize="md">
          {event.content?.body}
        </Text>
        <Text
          color={theme.light.button.primary.textColor}
          textAlign="right"
          fontSize="xs">
          {formatTime(event.origin_server_ts)}
        </Text>
      </Box>
    );
  }

  return (
    <Box key={event.event_id} style={styles.messageWrapper}>
      <Text>{event.sender}</Text>
      <Text>{event.content?.body}</Text>
      <Text>{formatTime(event.origin_server_ts)}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    backgroundColor: theme.light.button.primary.bgColor,
    borderRadius: 12,
    marginTop: 12,
    padding: 12,
  },
});

export default MessageItem;
