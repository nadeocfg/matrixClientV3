import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import { StyleProp } from 'react-native';
import { CloseEyeIcon, EyeIcon, MockedLogo } from '../../../components/icons';
import theme from '../../../themes/theme';

interface Step3Props {
  password: string;
  isPassword: boolean;
  onChange: any;
  onNext: () => void;
  styles?: StyleProp<any>;
}

const Step3 = ({
  onChange,
  onNext,
  password,
  isPassword,
  styles,
}: Step3Props) => {
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
        <Heading mt={4}>Choose a new password</Heading>
        <Text mt={4}>Make sure it’s 8 characters or more</Text>
      </Center>

      <Box style={styles.inner}>
        <FormControl>
          <Stack mb={8}>
            <Input
              type={isPassword ? 'password' : 'text'}
              fontSize="md"
              w="100%"
              variant="unstyled"
              placeholder="New Password"
              value={password}
              onChangeText={onChange('password')}
              InputRightElement={
                <Pressable onPress={onChange('isPassword')}>
                  {isPassword ? (
                    <CloseEyeIcon color="#000" />
                  ) : (
                    <EyeIcon color="#000" />
                  )}
                </Pressable>
              }
            />
          </Stack>
        </FormControl>

        <Button onPress={onNext}>Reset Password</Button>
      </Box>
    </ScrollView>
  );
};

export default Step3;
