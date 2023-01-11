import { Flex } from 'native-base';
import React from 'react';
import theme from '../themes/theme';

interface DefaultAvatarProps {
  name: string;
  inversed?: boolean;
  width: number;
  fontSize?: number;
}

const DefaultAvatar = ({
  name,
  width,
  fontSize = 20,
  inversed = false,
}: DefaultAvatarProps) => {
  return (
    <Flex
      align="center"
      justify="center"
      backgroundColor={
        inversed ? theme.light.darkPrimary : theme.light.secondary
      }
      borderRadius="full"
      width={width}
      height={width}>
      <Flex
        _text={{
          fontSize,
          textTransform: 'uppercase',
          fontWeight: '900',
          color: inversed ? theme.light.secondary : theme.light.primary,
        }}
        align="center"
        justify="center"
        w={width}
        h={width}>
        {name}
      </Flex>
    </Flex>
  );
};

export default DefaultAvatar;
