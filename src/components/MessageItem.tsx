import { Box, Flex, Image, Text } from 'native-base';
import React, { useContext } from 'react';
import { IEventWithRoomId } from 'matrix-js-sdk';
import { StyleSheet } from 'react-native';
import theme from '../themes/theme';
import { MatrixContext } from '../context/matrixContext';
import { formatDate } from '../utils/formatDate';
import DefaultAvatar from './DefaultAvatar';
import getTimelineJSXMessages, {
  GetTimelineJSXMessagesModel,
} from '../utils/getTimelineJSXMessages';

interface MessageItemProps {
  event: IEventWithRoomId;
  userId: string | null | undefined;
  isPrevSenderSame: boolean;
}

const MessageItem = ({ event, userId, isPrevSenderSame }: MessageItemProps) => {
  const matrixContext = useContext(MatrixContext);
  const userData = matrixContext.instance?.getUser(event.sender || '');
  const isMyMessage = userId === event.sender;
  const renderTimelineSystemMessage = getTimelineJSXMessages();

  console.log(event);

  const getMessage = (
    membership: keyof GetTimelineJSXMessagesModel | undefined,
  ): string => {
    if (!membership) {
      return '';
    }

    const sender = matrixContext.instance?.getUser(event.sender)?.displayName;
    const username = event.content.displayname;
    const reason = event.content.reason;

    switch (membership) {
      case 'join': {
        return renderTimelineSystemMessage.join(username || '');
      }

      case 'leave': {
        return renderTimelineSystemMessage.leave(sender || '');
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

  if (event.type === 'm.room.member') {
    return (
      <Flex
        mb={4}
        mt={6}
        direction="row"
        align="center"
        style={styles.systemMessage}>
        <Box>
          {event.content?.avatar_url ? (
            <Image
              src={
                matrixContext.instance?.mxcUrlToHttp(
                  event.content?.avatar_url || '',
                ) || ''
              }
              alt="Member avatar"
              borderRadius="full"
              width={8}
              height={8}
            />
          ) : (
            <DefaultAvatar
              name={
                (event.content?.displayname && event.content?.displayname[0]) ||
                ''
              }
              width={8}
            />
          )}
        </Box>

        <Box ml={2}>
          <Text>
            {getMessage(
              event.content?.membership as keyof GetTimelineJSXMessagesModel,
            )}
          </Text>
          <Text fontSize="2xs">{formatDate(event.origin_server_ts)}</Text>
        </Box>
      </Flex>
    );
  }

  if (event.type === 'm.room.message') {
    return (
      <Box
        style={[
          styles.messageWrapper,
          isMyMessage ? styles.myMessage : styles.notMyMessage,
          isPrevSenderSame ? styles.myPrev : null,
        ]}>
        <Flex direction="row" align="center">
          <Box mr={1} mb={1}>
            {userData?.avatarUrl ? (
              <Image
                src={
                  matrixContext.instance?.mxcUrlToHttp(
                    userData?.avatarUrl || '',
                  ) || ''
                }
                alt="Member avatar"
                borderRadius="full"
                width={8}
                height={8}
              />
            ) : (
              <DefaultAvatar
                name={userData?.displayName[0] || userData?.userId[0] || ''}
                width={8}
              />
            )}
          </Box>

          <Text
            mb={2}
            color={theme.light.button.primary.textColor}
            fontSize="sm"
            fontWeight={600}>
            {userData?.displayName || userData?.userId || ''}
          </Text>
        </Flex>
        <Text color={theme.light.button.primary.textColor} fontSize="md">
          {event.content?.body}
        </Text>
        <Text
          color={theme.light.button.primary.textColor}
          textAlign="right"
          fontSize="2xs">
          {formatDate(event.origin_server_ts)}
        </Text>
      </Box>
    );
  }

  return (
    <Box style={styles.messageWrapper}>
      <Text>{userData?.displayName || userData?.userId || ''}</Text>
      <Text>{event.content?.body}</Text>
      <Text>{formatDate(event.origin_server_ts)}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  systemMessage: {
    width: '100%',
  },
  messageWrapper: {
    width: '80%',
    backgroundColor: theme.light.button.primary.bgColor,
    borderRadius: 12,
    marginTop: 16,
    padding: 12,
  },
  myMessage: {
    borderBottomRightRadius: 0,
    marginLeft: 'auto',
  },
  notMyMessage: {
    borderBottomLeftRadius: 0,
    backgroundColor: theme.defaultGrey,
  },
  myPrev: {
    marginTop: 4,
  },
});

export default MessageItem;
