import { Box, Heading, IconButton } from 'native-base';
import React from 'react';
import theme from '../themes/theme';
import { navigationRef } from '../utils/navigation';
import { ArrowLeftIcon } from './icons';

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
      height={16}
      _light={{
        bg: theme.light.bgColor,
      }}
      _dark={{
        bg: theme.dark.bgColor,
      }}>
      <Box flexBasis={'20%'} justifyContent="flex-start">
        <IconButton
          width={12}
          height={12}
          variant="ghost"
          onPress={backAction ? backAction : goBack}
          icon={<ArrowLeftIcon />}
        />
      </Box>

      <Heading size="md" flexBasis={'60%'} textAlign="center">
        {title}
      </Heading>
      <Box flexBasis={'20%'}>{action}</Box>
    </Box>
  );
};

export default BaseHeader;
