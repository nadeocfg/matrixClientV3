import {
  Box,
  Flex,
  Image,
  IPressableProps,
  Pressable,
  Text,
} from 'native-base';
import React, { useContext } from 'react';
import { MatrixContext } from '../context/matrixContext';
import theme from '../themes/theme';
import BaseBadge from './BaseBadge';
import DefaultAvatar from './DefaultAvatar';
import { StyleSheet } from 'react-native';

type RoomListItemProps = {
  name: string;
  eventTime: string;
  unreadCount?: number;
  avatarUrl: string | null;
  message?: string;
  roomId: string;
  membership?: string;
  onSelectRoom: (roomId: string, roomName: string, avatarUrl: string) => void;
} & IPressableProps;

const RoomListItem = ({
  name,
  avatarUrl,
  eventTime,
  unreadCount,
  message,
  roomId,
  onSelectRoom,
  ...props
}: RoomListItemProps) => {
  const matrixContext = useContext(MatrixContext);

  const checkImageUrl = (url: string) => {
    if (url.startsWith('mxc')) {
      return matrixContext.instance?.mxcUrlToHttp(url);
    }

    return url;
  };

  const onPress = () => {
    onSelectRoom(roomId, name, checkImageUrl(avatarUrl || '') || '');
  };

  return (
    <Pressable onPress={onPress} {...props}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        borderBottomWidth={0.5}
        borderColor={theme.border}
        minH="20"
        p={2}>
        <Box style={avatarBadgeStyles.wrapper} flexBasis={'15%'}>
          {avatarUrl ? (
            <Image
              src={checkImageUrl(avatarUrl) || ''}
              alt="User avatar"
              borderRadius="full"
              width={12}
              height={12}
            />
          ) : (
            <DefaultAvatar name={name && name[0]} width={12} fontSize={24} />
          )}
          {unreadCount && unreadCount > 0 ? (
            <Box
              _light={{
                borderColor: theme.light.bgColor,
              }}
              _dark={{
                borderColor: theme.dark.bgColor,
              }}
              style={avatarBadgeStyles.badge}
            />
          ) : (
            <></>
          )}
        </Box>
        <Box flexBasis={'70%'}>
          <Text ml={2} fontSize={16}>
            {name}
          </Text>
          {message && (
            <Text ml={2} fontSize={12} display="flex" flexWrap="wrap">
              {message.length > 50 ? message.substring(0, 49) + '...' : message}
            </Text>
          )}
        </Box>
        <Flex
          flexBasis={'15%'}
          ml="auto"
          flexDirection="column"
          justify="flex-start"
          align="flex-end">
          <Text flex={1}>{eventTime}</Text>
          <BaseBadge value={unreadCount} />
        </Flex>
      </Box>
    </Pressable>
  );
};

const avatarBadgeStyles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 50,
    borderWidth: 3,
    backgroundColor: theme.primary,
  },
});

export default RoomListItem;
