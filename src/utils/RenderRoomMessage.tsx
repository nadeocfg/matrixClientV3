import { IEvent, MatrixClient, User } from 'matrix-js-sdk';
import { Box, Button, ColorMode, Flex, Text } from 'native-base';
import React from 'react';
import { Dimensions, Pressable, ViewStyle } from 'react-native';
import ImageModal from 'react-native-image-modal';
import { useAppDispatch } from '../hooks/useDispatch';
import {
  setVideoFullscreen,
  setVideoUrl,
} from '../store/actions/videoPlayerActions';
import theme from '../themes/theme';
import { formatDate } from './formatDate';
import renderAvatar from './renderMessageAvatar';

interface RenderRoomMessageProps {
  event: Partial<IEvent>;
  isMyMessage: boolean;
  isPressed: boolean;
  isPrevSenderSame: boolean;
  styles: {
    messageWrapper: ViewStyle;
    myMessage: ViewStyle;
    notMyMessage: ViewStyle;
    notMyMessageDark: ViewStyle;
    myPrev: ViewStyle;
    onPress: ViewStyle;
    onPressDark: ViewStyle;
    replyBlock: ViewStyle;
    notMyReplyBlock: ViewStyle;
    notMyReplyBlockDark: ViewStyle;
  };
  userData: User | null | undefined;
  matrixClient: MatrixClient | null;
  colorMode: ColorMode;
  onReplyPress: (event: Partial<IEvent>) => void;
}

const RenderRoomMessage = ({
  event,
  isMyMessage,
  isPrevSenderSame,
  styles,
  userData,
  matrixClient,
  colorMode,
  isPressed,
  onReplyPress,
}: RenderRoomMessageProps) => {
  const dispatch = useAppDispatch();
  const width = Dimensions.get('window').width;
  const hasThread = event.content?.['m.relates_to'] ? true : false;
  const replyMessage = event.content?.body?.split('\n\n');

  const setVideo = (url: string) => {
    dispatch(setVideoUrl(url));

    dispatch(setVideoFullscreen(true));
  };

  if (event.content?.msgtype === 'm.image') {
    return (
      <Box
        style={[
          styles.messageWrapper,
          isMyMessage
            ? styles.myMessage
            : colorMode === 'light'
            ? styles.notMyMessage
            : styles.notMyMessageDark,
          isPrevSenderSame ? styles.myPrev : null,
          isPressed === false
            ? null
            : colorMode === 'light'
            ? styles.onPress
            : styles.onPressDark,
          {
            transform: [
              {
                scale: isPressed ? 0.99 : 1,
              },
            ],
          },
        ]}>
        {!isMyMessage && (
          <Flex direction="row" align="center">
            <Box mr={1} mb={1}>
              {renderAvatar(event, matrixClient)}
            </Box>

            <Text
              mb={2}
              _light={{ color: isMyMessage ? theme.white : theme.greyIcon }}
              _dark={{ color: theme.white }}
              fontSize="sm"
              fontWeight={600}>
              {userData?.displayName || userData?.userId || ''}
            </Text>
          </Flex>
        )}

        <Flex direction="row" justify="center">
          <ImageModal
            resizeMode="contain"
            imageBackgroundColor={theme.primary}
            style={{
              width: width / 1.5,
              height: 250,
            }}
            source={{
              uri: matrixClient?.mxcUrlToHttp(event.content?.url) || '',
            }}
          />
        </Flex>

        <Text
          mt={2}
          _light={{ color: isMyMessage ? theme.dark.text : theme.greyIcon }}
          textAlign="right"
          fontSize="2xs">
          {formatDate(event.origin_server_ts)}
        </Text>
      </Box>
    );
  }

  if (event.content?.msgtype === 'm.video') {
    return (
      <Box
        style={[
          styles.messageWrapper,
          isMyMessage
            ? styles.myMessage
            : colorMode === 'light'
            ? styles.notMyMessage
            : styles.notMyMessageDark,
          isPrevSenderSame ? styles.myPrev : null,
          isPressed ? styles.onPress : null,
          {
            transform: [
              {
                scale: isPressed ? 0.96 : 1,
              },
            ],
          },
        ]}>
        {!isMyMessage && (
          <Flex direction="row" align="center">
            <Box mr={1} mb={1}>
              {renderAvatar(event, matrixClient)}
            </Box>
            <Text
              mb={2}
              _light={{ color: isMyMessage ? theme.white : theme.greyIcon }}
              fontSize="sm"
              fontWeight={600}>
              {userData?.displayName || userData?.userId || ''}
            </Text>
          </Flex>
        )}

        <Text
          _light={{ color: isMyMessage ? theme.white : theme.greyIcon }}
          fontSize="md">
          Video message
        </Text>
        <Text
          _light={{ color: isMyMessage ? theme.white : theme.greyIcon }}
          fontSize="md">
          Filename: {event.content?.body}
        </Text>

        <Button
          mt={2}
          mb={2}
          onPress={() =>
            setVideo(matrixClient?.mxcUrlToHttp(event.content?.url) || '')
          }
          variant="subtle"
          colorScheme="success">
          Show video
        </Button>

        <Text
          color={isMyMessage ? theme.dark.text : theme.greyIcon}
          textAlign="right"
          fontSize="2xs">
          {formatDate(event.origin_server_ts)}
        </Text>
      </Box>
    );
  }

  if (event.content?.msgtype === 'm.text') {
    return (
      <Box
        style={[
          styles.messageWrapper,
          isMyMessage
            ? styles.myMessage
            : colorMode === 'light'
            ? styles.notMyMessage
            : styles.notMyMessageDark,
          isPrevSenderSame ? styles.myPrev : null,
          isPressed ? styles.onPress : null,
          {
            transform: [
              {
                scale: isPressed ? 0.96 : 1,
              },
            ],
          },
        ]}>
        {!isMyMessage && (
          <Flex mb={2} direction="row" align="center">
            <Box mr={1}>{renderAvatar(event, matrixClient)}</Box>

            <Text
              _light={{ color: isMyMessage ? theme.white : theme.greyIcon }}
              fontSize="sm"
              fontWeight={600}>
              {userData?.displayName || userData?.userId || ''}
            </Text>
          </Flex>
        )}
        {hasThread ? (
          <>
            <Pressable onPress={() => onReplyPress(event)}>
              <Text
                _light={{ color: isMyMessage ? theme.white : theme.greyIcon }}
                fontSize="sm"
                style={
                  isMyMessage
                    ? styles.replyBlock
                    : colorMode === 'light'
                    ? styles.notMyReplyBlock
                    : styles.notMyReplyBlockDark
                }>
                {replyMessage[0]}
              </Text>
            </Pressable>
            <Text
              _light={{ color: isMyMessage ? theme.white : theme.greyIcon }}
              fontSize="md">
              {replyMessage[1]}
            </Text>
          </>
        ) : (
          <Text
            _light={{ color: isMyMessage ? theme.white : theme.greyIcon }}
            fontSize="md">
            {event.content?.body}
          </Text>
        )}

        <Text
          mt={2}
          _light={{ color: isMyMessage ? theme.dark.text : theme.greyIcon }}
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
