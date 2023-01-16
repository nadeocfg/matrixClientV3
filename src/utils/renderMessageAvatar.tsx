import { IEvent, IEventWithRoomId, MatrixClient } from 'matrix-js-sdk';
import { Image } from 'native-base';
import React from 'react';
import DefaultAvatar from '../components/DefaultAvatar';

const renderAvatar = (
  event: IEventWithRoomId | Partial<IEvent>,
  matrixClient: MatrixClient | null,
) => {
  return event.content?.avatar_url ||
    matrixClient?.getUser(event.sender || '')?.avatarUrl ? (
    <Image
      src={
        matrixClient?.mxcUrlToHttp(
          event.content?.avatar_url ||
            matrixClient?.getUser(event.sender || '')?.avatarUrl ||
            '',
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
        (matrixClient?.getUser(event.sender || '')?.displayName &&
          matrixClient?.getUser(event.sender || '')?.displayName[0]) ||
        ''
      }
      width={8}
    />
  );
};

export default renderAvatar;
