import { IEventWithRoomId, MatrixClient, User } from 'matrix-js-sdk';
import { Box, Button, Flex, Image, Pressable, Text } from 'native-base';
import React from 'react';
import { ViewStyle, Linking } from 'react-native';
import { useAppDispatch } from '../hooks/useDispatch';
import {
  setVideoFullscreen,
  setVideoUrl,
} from '../store/actions/videoPlayerActions';
import theme from '../themes/theme';
import { formatDate } from './formatDate';
import renderAvatar from './renderMessageAvatar';

interface RenderRoomMessageProps {
  event: IEventWithRoomId;
  isMyMessage: boolean;
  isPrevSenderSame: boolean;
  styles: {
    messageWrapper: ViewStyle;
    myMessage: ViewStyle;
    notMyMessage: ViewStyle;
    myPrev: ViewStyle;
  };
  userData: User | null | undefined;
  matrixClient: MatrixClient | null;
}

const RenderRoomMessage = ({
  event,
  isMyMessage,
  isPrevSenderSame,
  styles,
  userData,
  matrixClient,
}: RenderRoomMessageProps) => {
  const dispatch = useAppDispatch();

  const openFile = () => {
    Linking.openURL(matrixClient?.mxcUrlToHttp(event.content.url) || '');
  };

  const setVideo = (url: string) => {
    dispatch(setVideoUrl(url));

    dispatch(setVideoFullscreen(true));
  };

  if (event.content.msgtype === 'm.image') {
    return (
      <Box
        style={[
          styles.messageWrapper,
          isMyMessage ? styles.myMessage : styles.notMyMessage,
          isPrevSenderSame ? styles.myPrev : null,
        ]}>
        <Flex direction="row" align="center">
          <Box mr={1} mb={1}>
            {renderAvatar(event, matrixClient)}
          </Box>

          <Text
            mb={2}
            color={theme.light.button.primary.textColor}
            fontSize="sm"
            fontWeight={600}>
            {userData?.displayName || userData?.userId || ''}
          </Text>
        </Flex>
        <Pressable onPress={openFile}>
          <Image
            src={matrixClient?.mxcUrlToHttp(event.content.url) || ''}
            size="xl"
            borderRadius="md"
            alt="User avatar"
            height={64}
            width="full"
            resizeMode="cover"
          />
        </Pressable>
        <Text
          color={theme.light.button.primary.textColor}
          textAlign="right"
          fontSize="2xs">
          {formatDate(event.origin_server_ts)}
        </Text>
      </Box>
    );
  }

  if (event.content.msgtype === 'm.video') {
    return (
      <Box
        style={[
          styles.messageWrapper,
          isMyMessage ? styles.myMessage : styles.notMyMessage,
          isPrevSenderSame ? styles.myPrev : null,
        ]}>
        <Flex direction="row" align="center">
          <Box mr={1} mb={1}>
            {renderAvatar(event, matrixClient)}
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
          Video message
        </Text>
        <Text color={theme.light.button.primary.textColor} fontSize="md">
          Filename: {event.content?.body}
        </Text>

        <Button
          mt={2}
          mb={2}
          onPress={() =>
            setVideo(matrixClient?.mxcUrlToHttp(event.content.url) || '')
          }
          variant="subtle"
          colorScheme="success">
          Show video
        </Button>

        <Text
          color={theme.light.button.primary.textColor}
          textAlign="right"
          fontSize="2xs">
          {formatDate(event.origin_server_ts)}
        </Text>
      </Box>
    );
  }

  if (event.content.msgtype === 'm.text') {
    return (
      <Box
        style={[
          styles.messageWrapper,
          isMyMessage ? styles.myMessage : styles.notMyMessage,
          isPrevSenderSame ? styles.myPrev : null,
        ]}>
        <Flex direction="row" align="center">
          <Box mr={1} mb={1}>
            {renderAvatar(event, matrixClient)}
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

  return <></>;
};

export default RenderRoomMessage;
