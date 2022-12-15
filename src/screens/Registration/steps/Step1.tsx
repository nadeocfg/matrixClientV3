import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Pressable,
  Stack,
} from 'native-base';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { CloseEyeIcon, EyeIcon, MockedLogo } from '../../../components/icons';
import theme from '../../../themes/theme';

interface Step1Props {
  colorMode: 'light' | 'dark';
  server: string;
  username: string;
  password: string;
  onChange: Function;
  setIsDisabled: Function;
  setIsPassword: Function;
  onNext: () => void;
  isDisabled: boolean;
  isPassword: boolean;
  style?: StyleProp<ViewStyle>;
}

const Step1 = ({
  server,
  username,
  password,
  onChange,
  isDisabled,
  setIsDisabled,
  setIsPassword,
  isPassword,
  onNext,
  colorMode,
}: Step1Props) => {
  return (
    <Box>
      <Center mb={12}>
        <MockedLogo />
        <Heading mt={4}>Create your account</Heading>
      </Center>

      <Box>
        <FormControl>
          <FormControl.Label>
            Where your conversations will live
          </FormControl.Label>
          <Stack
            mb={8}
            borderBottomWidth={1}
            paddingBottom={2}
            borderColor={theme[colorMode || 'light'].button.primary.bgColor}>
            <Input
              fontSize="sm"
              w="100%"
              p="0"
              variant="unstyled"
              value={server}
              onChangeText={onChange('server')}
              isDisabled={isDisabled}
              InputRightElement={
                <Button
                  size="xs"
                  variant="outline"
                  w="1/6"
                  h="full"
                  onPress={() => setIsDisabled(!isDisabled)}>
                  {isDisabled ? 'Edit' : 'Save'}
                </Button>
              }
              placeholder="Home server"
            />
          </Stack>
        </FormControl>

        <FormControl>
          <Stack mb={8} px={4}>
            <Input
              px={0}
              fontSize="md"
              w="100%"
              variant="unstyled"
              placeholder="Username"
              value={username}
              onChangeText={onChange('username')}
            />
          </Stack>
        </FormControl>

        <FormControl>
          <Stack mb={8} px={4}>
            <Input
              px={0}
              type={isPassword ? 'password' : 'text'}
              fontSize="md"
              w="100%"
              variant="unstyled"
              placeholder="Password"
              value={password}
              onChangeText={onChange('password')}
              InputRightElement={
                <Pressable onPress={() => setIsPassword(!isPassword)}>
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

        <Button onPress={onNext}>Next</Button>
      </Box>
    </Box>
  );
};

export default Step1;
