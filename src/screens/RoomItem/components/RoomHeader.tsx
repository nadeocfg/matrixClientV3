import { Box, ChevronLeftIcon, Heading, IconButton, Image } from 'native-base';
import React, { PropsWithChildren } from 'react';
import { ArrowLeftIcon } from '../../../components/icons';
import theme from '../../../themes/theme';
import { navigationRef } from '../../../utils/navigation';

interface RoomHeaderProps {
  name: string;
  avatar: string;
}

const RoomHeader: React.FC<PropsWithChildren<RoomHeaderProps>> = ({
  name,
  avatar,
}) => {
  const goBack = () => {
    navigationRef.goBack();
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      _light={{
        bg: theme.light.button.primary.bgColor,
      }}
      _dark={{
        bg: theme.dark.button.primary.bgColor,
      }}>
      <IconButton
        onPress={goBack}
        icon={<ChevronLeftIcon />}
        borderRadius="full"
        _light={{
          _icon: {
            color: theme.dark.button.primary.bgColor,
          },
        }}
        _dark={{
          _icon: {
            color: theme.light.button.primary.bgColor,
          },
        }}
        _hover={{
          bg: 'orange.600:alpha.20',
        }}
        _pressed={{
          _light: {
            _icon: {
              color: theme.light.button.primary.bgColor,
            },
          },
          _dark: {
            _icon: {
              color: theme.dark.button.primary.bgColor,
            },
          },
          _ios: {
            _icon: {
              size: '2xl',
            },
          },
        }}
        _ios={{
          _icon: {
            size: '2xl',
          },
        }}
      />
      <Image
        src={avatar}
        alt="Avatar of room"
        borderRadius="full"
        width={12}
        height={12}
      />
      <Heading>{name}</Heading>
    </Box>
  );
};

export default RoomHeader;
