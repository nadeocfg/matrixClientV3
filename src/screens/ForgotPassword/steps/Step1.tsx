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

interface Step1Props {
  email: string;
  onChangeEmail: (value: string) => void;
  onNext: () => void;
  styles: StyleProp<any>;
}

const Step1 = ({ email, onChangeEmail, onNext, styles }: Step1Props) => {
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
        <Text mt={4}>matrix.org will send you a verification link</Text>
      </Center>

      <Box style={styles.inner}>
        <FormControl>
          <Stack mb={8} px={4}>
            <Input
              px={0}
              fontSize="md"
              w="100%"
              variant="unstyled"
              placeholder="Email"
              value={email}
              onChangeText={onChangeEmail}
            />
          </Stack>
        </FormControl>

        <Button onPress={onNext}>Next</Button>
      </Box>
    </ScrollView>
  );
};

export default Step1;
