import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import { StyleProp } from 'react-native';
import { MockedLogo } from '../../../components/icons';
import theme from '../../../themes/theme';

interface Step2Props {
  email: string;
  onChange: Function;
  onNext: () => void;
  resendEmail: () => void;
  styles: StyleProp<any>;
}

const Step2 = ({
  email,
  onChange,
  onNext,
  resendEmail,
  styles,
}: Step2Props) => {
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
        <Heading mt={4}>Enter your email</Heading>
        <Text mt={4}>matrix.org needs to verify your account</Text>
      </Center>

      <Box style={styles.inner}>
        <FormControl>
          <Stack mb={8}>
            <Input
              fontSize="md"
              w="100%"
              variant="unstyled"
              placeholder="Email"
              value={email}
              onChangeText={onChange('email')}
            />
          </Stack>
        </FormControl>

        <Button onPress={onNext}>Next</Button>
      </Box>

      <Center flexDirection="column">
        Did not receive an email?
        <Button variant="link" size="sm" onPress={resendEmail}>
          Resend email
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Step2;
