import {
  Box,
  Heading,
  IconButton,
  Image,
  Menu,
  useColorMode,
} from 'native-base';
import React from 'react';
import { DotsIcon } from '../../../components/icons';
import theme from '../../../themes/theme';
import { RootStackModel } from '../../../types/rootStackType';
import { navigate } from '../../../utils/navigation';

const RoomListHeader: React.FC = () => {
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
      _light={{
        bg: theme.light.button.primary.bgColor,
      }}
      _dark={{
        bg: theme.dark.button.primary.bgColor,
      }}>
      <Image
        src={''}
        alt="Avatar of room"
        borderRadius="full"
        width={12}
        height={12}
      />
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
