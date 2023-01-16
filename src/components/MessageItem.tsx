import { Box, Flex, Menu, Text, useColorMode } from 'native-base';
import React, { useContext } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import theme from '../themes/theme';
import { MatrixContext } from '../context/matrixContext';
import { formatDate } from '../utils/formatDate';
import renderAvatar from '../utils/renderMessageAvatar';
import renderRoomMemberMessage from '../utils/renderRoomMemberMessage';
import RenderRoomMessage from '../utils/RenderRoomMessage';
import { RoomEventInterface } from '../types/roomEventInterface';

interface MessageItemProps {
  event: RoomEventInterface;
  userId: string | null | undefined;
  isPrevSenderSame: boolean;
  onReplyLongPress: (event: RoomEventInterface) => void;
  onReplyPress: (event: RoomEventInterface) => void;
}

const MessageItem = ({
  event,
  userId,
  isPrevSenderSame,
  onReplyLongPress,
  onReplyPress,
}: MessageItemProps) => {
  const matrixContext = useContext(MatrixContext);
  const userData = matrixContext.instance?.getUser(event.sender || '');
  const isMyMessage = userId === event.sender;
  const { colorMode } = useColorMode();

  if (event.type === 'm.room.create') {
    return (
      <Flex
        mb={4}
        mt={6}
        direction="row"
        align="center"
        style={styles.systemMessage}>
        <Box>{renderAvatar(event, matrixContext.instance)}</Box>

        <Box ml={2}>
          <Text>
            {`${
              matrixContext.instance?.getUser(event.sender)?.displayName
            } create group`}
          </Text>
          <Text fontSize="2xs">{formatDate(event.origin_server_ts)}</Text>
        </Box>
      </Flex>
    );
  }

  if (event.type === 'm.room.join_rules') {
    return (
      <Flex
        mb={4}
        mt={6}
        direction="row"
        align="center"
        style={styles.systemMessage}>
        <Box>{renderAvatar(event, matrixContext.instance)}</Box>

        <Box ml={2}>
          <Text>
            {`${
              matrixContext.instance?.getUser(event.sender)?.displayName
            } change join rule on "${event.content.join_rule}"`}
          </Text>
          <Text fontSize="2xs">{formatDate(event.origin_server_ts)}</Text>
        </Box>
      </Flex>
    );
  }

  if (event.type === 'm.room.history_visibility') {
    return (
      <Flex
        mb={4}
        mt={6}
        direction="row"
        align="center"
        style={styles.systemMessage}>
        <Box>{renderAvatar(event, matrixContext.instance)}</Box>

        <Box ml={2}>
          <Text>
            {`${
              matrixContext.instance?.getUser(event.sender)?.displayName
            } change history visibility on "${
              event.content.history_visibility
            }"`}
          </Text>
          <Text fontSize="2xs">{formatDate(event.origin_server_ts)}</Text>
        </Box>
      </Flex>
    );
  }

  if (event.type === 'm.room.name') {
    return (
      <Flex
        mb={4}
        mt={6}
        direction="row"
        align="center"
        style={styles.systemMessage}>
        <Box>{renderAvatar(event, matrixContext.instance)}</Box>

        <Box ml={2}>
          <Text>
            {`${
              matrixContext.instance?.getUser(event.sender)?.displayName
            } change group name on "${event.content.name}"`}
          </Text>
          <Text fontSize="2xs">{formatDate(event.origin_server_ts)}</Text>
        </Box>
      </Flex>
    );
  }

  if (event.type === 'm.room.topic') {
    return (
      <Flex
        mb={4}
        mt={6}
        direction="row"
        align="center"
        style={styles.systemMessage}>
        <Box>{renderAvatar(event, matrixContext.instance)}</Box>

        <Box ml={2}>
          <Text>
            {`${
              matrixContext.instance?.getUser(event.sender)?.displayName
            } change group topic on "${event.content.topic}"`}
          </Text>
          <Text fontSize="2xs">{formatDate(event.origin_server_ts)}</Text>
        </Box>
      </Flex>
    );
  }

  if (event.type === 'm.room.power_levels') {
    return (
      <Flex
        mb={4}
        mt={6}
        direction="row"
        align="center"
        style={styles.systemMessage}>
        <Box>{renderAvatar(event, matrixContext.instance)}</Box>

        <Box ml={2}>
          <Text>
            {`${
              matrixContext.instance?.getUser(event.sender)?.displayName
            } change group permissions`}
          </Text>
          <Text fontSize="2xs">{formatDate(event.origin_server_ts)}</Text>
        </Box>
      </Flex>
    );
  }

  if (event.type === 'm.room.member') {
    return renderRoomMemberMessage(
      event,
      matrixContext.instance,
      styles.systemMessage,
    );
  }

  if (event.type === 'm.room.message') {
    return (
      <Menu
        trigger={triggerProps => {
          return (
            <Pressable
              {...triggerProps}
              onPress={() => {}}
              onLongPress={triggerProps.onPress}>
              {({ pressed }) => {
                return (
                  <RenderRoomMessage
                    event={event}
                    isMyMessage={isMyMessage}
                    colorMode={colorMode}
                    isPrevSenderSame={isPrevSenderSame}
                    styles={styles}
                    userData={userData}
                    matrixClient={matrixContext.instance}
                    isPressed={pressed}
                    onReplyPress={onReplyPress}
                  />
                );
              }}
            </Pressable>
          );
        }}>
        <Menu.Item variant="withBorder" onPress={() => onReplyLongPress(event)}>
          Reply
        </Menu.Item>
        <Menu.Item onPress={() => {}}>Delete</Menu.Item>
      </Menu>
    );
  }

  return <></>;
};

const styles = StyleSheet.create({
  systemMessage: {
    width: '100%',
  },
  messageWrapper: {
    width: '80%',
    backgroundColor: theme.primary,
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
    backgroundColor: theme.light.messageBg,
  },
  notMyMessageDark: {
    borderBottomLeftRadius: 0,
    backgroundColor: theme.dark.messageBg,
  },
  myPrev: {
    marginTop: 4,
  },
  onPress: {
    backgroundColor: theme.darkPrimary,
  },
  replyBlock: {
    borderLeftWidth: 2,
    borderLeftColor: theme.greyLight,
    paddingLeft: 12,
    marginBottom: 8,

    // padding: 8,
    // backgroundColor: theme.greyIcon,
    // borderRadius: 12,
  },
  notMyReplyBlock: {
    borderLeftWidth: 2,
    borderLeftColor: theme.greyLight,
    paddingLeft: 12,
    marginBottom: 8,

    // padding: 8,
    // borderRadius: 12,
    // backgroundColor: theme.greyLight,
    // color: theme.greyIcon,
  },
});

export default MessageItem;
