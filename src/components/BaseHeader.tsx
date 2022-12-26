import { Box, ChevronLeftIcon, Heading, IconButton } from 'native-base';
import React from 'react';
import theme from '../themes/theme';
import { navigationRef } from '../utils/navigation';

interface BaseHeaderProps {
  title: string;
  action?: JSX.Element;
  backAction?: () => void;
}

const BaseHeader = ({ title, action = <></>, backAction }: BaseHeaderProps) => {
  const goBack = () => navigationRef.goBack();

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
      <IconButton
        variant="ghost"
        onPress={backAction ? backAction : goBack}
        icon={<ChevronLeftIcon />}
      />
      <Heading>{title}</Heading>
      <Box>{action}</Box>
    </Box>
  );
};

export default BaseHeader;
