import { Box, ChevronLeftIcon, Heading, IconButton, Image } from 'native-base';
import React, { PropsWithChildren } from 'react';
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
      <IconButton variant="ghost" onPress={goBack} icon={<ChevronLeftIcon />} />
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
