import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { MockedLogo } from '../../../components/icons';

interface Step2Props {
  colorMode: 'light' | 'dark';
  email: string;
  onChange: Function;
  onNext: () => void;
  style?: StyleProp<ViewStyle>;
}

const Step2 = ({ email, onChange, onNext }: Step2Props) => {
  return (
    <Box>
      <Center mb={12}>
        <MockedLogo />
        <Heading mt={4}>Enter your email</Heading>
        <Text mt={4}>matrix.org needs to verify your account</Text>
      </Center>

      <Box>
        <FormControl>
          <Stack mb={8} px={4}>
            <Input
              px={0}
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
    </Box>
  );
};

export default Step2;
