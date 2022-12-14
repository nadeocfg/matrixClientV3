import { Box, Button, Center, Heading, ScrollView, Text } from 'native-base';
import React from 'react';
import { StyleProp } from 'react-native';
import DefaultAvatar from '../../../components/DefaultAvatar';
import theme from '../../../themes/theme';

interface Step4Props {
  onFinishResetPassword: () => void;
  styles?: StyleProp<any>;
}

const Step4 = ({ styles, onFinishResetPassword }: Step4Props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      p={4}
      _light={{
        bg: theme.light.bgColor,
      }}
      _dark={{
        bg: theme.dark.bgColor,
      }}>
      <Center mb={12}>
        <DefaultAvatar name="A" width={32} fontSize={48} />
        <Heading mt={4}>Congratulations!</Heading>
        <Text mt={4}>Your password has been changed</Text>
      </Center>

      <Box style={styles.inner} />

      <Center>
        <Button onPress={onFinishResetPassword} w="100%">
          Log in
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Step4;
