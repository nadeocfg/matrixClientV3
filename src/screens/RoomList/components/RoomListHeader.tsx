import {
  Box,
  Heading,
  IconButton,
  Image,
  Menu,
  Pressable,
  useColorMode,
} from 'native-base';
import React from 'react';
import DefaultAvatar from '../../../components/DefaultAvatar';
import { DotsIcon } from '../../../components/icons';
import { useAppSelector } from '../../../hooks/useSelector';
import theme from '../../../themes/theme';
import { RootStackModel } from '../../../types/rootStackType';
import { StoreModel } from '../../../types/storeTypes';
import { navigate } from '../../../utils/navigation';

interface RoomListHeaderProps {
  userAvatar: string;
}

const RoomListHeader = ({ userAvatar }: RoomListHeaderProps) => {
  const userData = useAppSelector((state: StoreModel) => state.userStore.user);
  const { colorMode } = useColorMode();

  const goTo = (screen: keyof RootStackModel) => {
    navigate(screen);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      height={16}
      px={4}
      _light={{
        bg: theme.light.bgColor,
      }}
      _dark={{
        bg: theme.dark.bgColor,
      }}>
      <Pressable onPress={() => goTo('PersonalInformationSettings')}>
        {userAvatar ? (
          <Image
            src={userAvatar}
            alt="Avatar of user"
            borderRadius="full"
            width={10}
            height={10}
          />
        ) : (
          <DefaultAvatar
            name={userData.userId ? userData.userId[1] : ''}
            width={10}
          />
        )}
      </Pressable>

      <Heading size="md">Chats</Heading>

      <Menu
        offset={24}
        trigger={triggerProps => {
          return (
            <IconButton
              variant="ghost"
              {...triggerProps}
              icon={
                <DotsIcon
                  color={
                    colorMode === 'light' ? theme.light.text : theme.chipBg
                  }
                />
              }
            />
          );
        }}>
        <Menu.Item variant="withBorder" onPress={() => goTo('CreateRoom')}>
          New group
        </Menu.Item>
        <Menu.Item onPress={() => goTo('ProfileSettings')}>Settings</Menu.Item>
      </Menu>
    </Box>
  );
};

export default RoomListHeader;
