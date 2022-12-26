import {
  Box,
  Heading,
  IconButton,
  Image,
  Menu,
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
  const { colorMode } = useColorMode();
  const userData = useAppSelector((state: StoreModel) => state.userStore.user);

  const goTo = (screen: keyof RootStackModel) => {
    navigate(screen);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      _light={{
        bg: theme.light.button.primary.bgColor,
      }}
      _dark={{
        bg: theme.dark.button.primary.bgColor,
      }}>
      {userAvatar ? (
        <Image
          src={userAvatar}
          alt="Avatar of user"
          borderRadius="full"
          width={12}
          height={12}
        />
      ) : (
        <DefaultAvatar
          name={userData.userId ? userData.userId[1] : ''}
          width={12}
        />
      )}

      <Heading>Chats</Heading>
      <Menu
        offset={16}
        trigger={triggerProps => {
          return (
            <IconButton
              width={12}
              height={12}
              variant="ghost"
              {...triggerProps}
              icon={
                <DotsIcon
                  color={
                    colorMode === 'dark'
                      ? theme.dark.button.primary.textColor
                      : theme.light.button.primary.textColor
                  }
                />
              }
            />
          );
        }}>
        <Menu.Item onPress={() => goTo('ProfileSettings')}>Settings</Menu.Item>
        <Menu.Item onPress={() => goTo('CreateRoom')}>New group</Menu.Item>
      </Menu>
    </Box>
  );
};

export default RoomListHeader;
