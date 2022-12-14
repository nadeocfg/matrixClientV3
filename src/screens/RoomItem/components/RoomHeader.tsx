import {
  Box,
  Heading,
  IconButton,
  Image,
  Menu,
  useColorMode,
} from 'native-base';
import React, { PropsWithChildren } from 'react';
import DefaultAvatar from '../../../components/DefaultAvatar';
import { ArrowLeftIcon, DotsIcon } from '../../../components/icons';
import theme from '../../../themes/theme';
import { RootStackModel } from '../../../types/rootStackType';
import { navigate, navigationRef } from '../../../utils/navigation';

interface RoomHeaderProps {
  name: string;
  avatar: string;
  roomId: string;
  membership: string;
}

const RoomHeader: React.FC<PropsWithChildren<RoomHeaderProps>> = ({
  name,
  avatar,
  roomId,
  membership,
}) => {
  const { colorMode } = useColorMode();

  const goBack = () => {
    navigationRef.goBack();
  };

  const goTo = (screen: keyof RootStackModel) => {
    navigate(screen, { roomId: roomId });
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      height={16}
      _light={{
        bg: theme.light.bgColor,
      }}
      _dark={{
        bg: theme.dark.bgColor,
      }}>
      <IconButton
        width={12}
        height={12}
        variant="ghost"
        onPress={goBack}
        icon={<ArrowLeftIcon color={theme.primary} />}
      />
      {avatar ? (
        <Image
          src={avatar}
          alt="Avatar of room"
          borderRadius="full"
          width={12}
          height={12}
        />
      ) : (
        <DefaultAvatar name={name[0]} width={12} />
      )}

      <Heading size="md" flexBasis="50%" flexGrow={1} ml={2}>
        {name.length > 40 ? name.substring(0, 39) + '...' : name}
      </Heading>

      {membership === 'join' && (
        <Menu
          flexBasis="10%"
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
                      colorMode === 'dark' ? theme.greyIcon : theme.primary
                    }
                  />
                }
              />
            );
          }}>
          <Menu.Item onPress={() => goTo('RoomSettings')}>Settings</Menu.Item>
        </Menu>
      )}
    </Box>
  );
};

export default RoomHeader;
