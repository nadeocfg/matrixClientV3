import { Box, Button, Center, Heading, ScrollView, Text } from 'native-base';
import React from 'react';
import { StyleProp } from 'react-native';
import DefaultAvatar from '../../../components/DefaultAvatar';
import theme from '../../../themes/theme';

interface Step3Props {
  resendEmail: () => void;
  email: string;
  onNext: () => void;
  styles?: StyleProp<any>;
}

const Step3 = ({ resendEmail, onNext, email, styles }: Step3Props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      px={4}
      _light={{
        bg: theme.light.bgColor,
      }}
      _dark={{
        bg: theme.dark.bgColor,
      }}>
      <Center mt={4} mb={12}>
        <DefaultAvatar name="A" width={32} fontSize={48} />
        <Heading mt={4}>Verify your email</Heading>
        <Text mt={4}>Follow the instructions sent to {email}</Text>
      </Center>

      <Box style={styles.inner}>
        <Button onPress={onNext}>Next</Button>
      </Box>

      <Center flexDirection="column" my={4}>
        Did not receive an email?
        <Button variant="link" size="sm" onPress={resendEmail}>
          Resend email
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Step3;
