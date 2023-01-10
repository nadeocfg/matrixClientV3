import { IEventWithRoomId, MatrixClient } from 'matrix-js-sdk';
import getTimelineJSXMessages from './getTimelineJSXMessages';
import React from 'react';
import { ViewStyle } from 'react-native';
import { formatDate } from './formatDate';
import { Box, Flex, Text } from 'native-base';
import renderAvatar from './renderMessageAvatar';

const renderRoomMemberMessage = (
  event: IEventWithRoomId,
  matrixClient: MatrixClient | null,
  systemMessage: ViewStyle,
): React.ReactElement => {
  const renderTimelineSystemMessage = getTimelineJSXMessages();

  const getMessage = () => {
    if (!event.content?.membership) {
      return '';
    }

    const sender = matrixClient?.getUser(event.sender)?.displayName;
    const username = event.content.displayname;
    const reason = event.content.reason;

    switch (event.content?.membership) {
      case 'join': {
        return renderTimelineSystemMessage.join(username || '');
      }

      case 'leave': {
        return renderTimelineSystemMessage.leave(
          sender || '',
          reason,
          username,
        );
      }

      case 'invite': {
        return renderTimelineSystemMessage.invite(sender || '', username || '');
      }

      case 'cancelInvite': {
        return renderTimelineSystemMessage.cancelInvite(
          sender || '',
          username || '',
        );
      }

      case 'rejectInvite': {
        return renderTimelineSystemMessage.rejectInvite(username || '');
      }

      case 'kick': {
        return renderTimelineSystemMessage.kick(
          sender || '',
          username || '',
          reason,
        );
      }

      case 'ban': {
        return renderTimelineSystemMessage.ban(
          sender || '',
          username || '',
          reason,
        );
      }

      case 'unban': {
        return renderTimelineSystemMessage.unban(sender || '', username || '');
      }

      case 'avatarSets': {
        return renderTimelineSystemMessage.avatarSets(username || '');
      }

      case 'avatarChanged': {
        return renderTimelineSystemMessage.avatarChanged(username || '');
      }

      case 'avatarRemoved': {
        return renderTimelineSystemMessage.avatarRemoved(username || '');
      }

      default: {
        return '';
      }
    }
  };

  return (
    <Flex mb={4} mt={6} direction="row" align="center" style={systemMessage}>
      <Box>{renderAvatar(event, matrixClient)}</Box>

      <Box ml={2}>
        <Text>{getMessage()}</Text>
        <Text fontSize="2xs">{formatDate(event.origin_server_ts)}</Text>
      </Box>
    </Flex>
  );
};

export default renderRoomMemberMessage;
