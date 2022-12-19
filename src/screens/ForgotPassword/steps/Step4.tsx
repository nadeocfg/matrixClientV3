import { Box, Button, Center, Heading, ScrollView, Text } from 'native-base';
import React from 'react';
import { StyleProp } from 'react-native';
import { MockedLogo } from '../../../components/icons';
import theme from '../../../themes/theme';
import { navigate } from '../../../utils/navigation';

interface Step4Props {
  styles?: StyleProp<any>;
}

const Step4 = ({ styles }: Step4Props) => {
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
        <MockedLogo />
        <Heading mt={4}>Congratulations!</Heading>
        <Text mt={4}>Your password has been changed</Text>
      </Center>

      <Box style={styles.inner} />

      <Center>
        <Button onPress={() => navigate('Login')} w="100%">
          Log in
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Step4;
