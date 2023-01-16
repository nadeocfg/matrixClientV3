import { IEvent, MatrixClient } from 'matrix-js-sdk';
import getTimelineJSXMessages from './getTimelineJSXMessages';
import React from 'react';
import { ViewStyle } from 'react-native';
import { formatDate } from './formatDate';
import { Box, Flex, Text } from 'native-base';
import renderAvatar from './renderMessageAvatar';

const renderRoomMemberMessage = (
  event: Partial<IEvent>,
  matrixClient: MatrixClient | null,
  systemMessage: ViewStyle,
): React.ReactElement => {
  return (
    <Flex mb={4} mt={6} direction="row" align="center" style={systemMessage}>
      <Box>{renderAvatar(event, matrixClient)}</Box>

      <Box ml={2}>
        <Text>{getTimelineJSXMessages(event, matrixClient)}</Text>
        <Text fontSize="2xs">{formatDate(event.origin_server_ts)}</Text>
      </Box>
    </Flex>
  );
};

export default renderRoomMemberMessage;
