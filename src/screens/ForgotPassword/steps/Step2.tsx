import { Box, Button, Center, Heading, ScrollView, Text } from 'native-base';
import React from 'react';
import { StyleProp } from 'react-native';
import { MockedLogo } from '../../../components/icons';
import theme from '../../../themes/theme';

interface Step2Props {
  resendEmail: () => void;
  email: string;
  onNext: () => void;
  styles?: StyleProp<any>;
}

const Step2 = ({ resendEmail, onNext, email, styles }: Step2Props) => {
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
        <Heading mt={4}>Check your email</Heading>
        <Text mt={4}>Follow the instructions sent to {email}</Text>
      </Center>

      <Box style={styles.inner} />

      <Center flexDirection="column">
        <Button onPress={onNext} mb={4} w="100%">
          Next
        </Button>
        <Button variant="link" onPress={resendEmail}>
          Resend email
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Step2;
