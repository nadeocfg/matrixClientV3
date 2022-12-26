import { Box, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import theme from '../themes/theme';

interface DefaultAvatarProps {
  name: string;
  width: number;
  fontSize?: number;
}

const DefaultAvatar = ({ name, width, fontSize = 20 }: DefaultAvatarProps) => {
  return (
    <Box style={styles.avatarWrapper} width={width} height={width}>
      <Text style={[styles.text, { fontSize: fontSize }]}>{name}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  avatarWrapper: {
    backgroundColor: theme.defaultGrey,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.light.bgColor,
    textTransform: 'uppercase',
    fontWeight: '900',
  },
});

export default DefaultAvatar;
