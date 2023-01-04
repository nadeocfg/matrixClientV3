import { Flex } from 'native-base';
import React from 'react';
import theme from '../themes/theme';

interface DefaultAvatarProps {
  name: string;
  width: number;
  fontSize?: number;
}

const DefaultAvatar = ({ name, width, fontSize = 20 }: DefaultAvatarProps) => {
  return (
    <Flex
      align="center"
      justify="center"
      backgroundColor={theme.defaultGrey}
      borderRadius="full"
      width={width}
      height={width}>
      <Flex
        _text={{
          fontSize,
          textTransform: 'uppercase',
          fontWeight: '900',
          color: theme.light.bgColor,
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
