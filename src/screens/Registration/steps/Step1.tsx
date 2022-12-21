import {
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  Heading,
  Input,
  Pressable,
  ScrollView,
  Stack,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';
import { StyleProp } from 'react-native';
import { CloseEyeIcon, EyeIcon, MockedLogo } from '../../../components/icons';
import PPModal from '../../../components/PPModal';
import TUModal from '../../../components/TUModal';
import theme from '../../../themes/theme';
import { navigate } from '../../../utils/navigation';

interface Step1Props {
  colorMode: 'light' | 'dark';
  server: string;
  username: string;
  password: string;
  isAgree: boolean;
  termsLink: string;
  setIsAgree: (isAgree: boolean) => void;
  isUsernameExist: boolean;
  onChange: Function;
  setIsDisabled: Function;
  setIsPassword: Function;
  checkUsername: (e: any) => void;
  onNext: () => void;
  isDisabled: boolean;
  isPassword: boolean;
  styles: StyleProp<any>;
}

const Step1 = ({
  server,
  termsLink,
  username,
  password,
  onChange,
  isDisabled,
  setIsDisabled,
  setIsPassword,
  isPassword,
  isAgree,
  setIsAgree,
  isUsernameExist,
  onNext,
  colorMode,
  checkUsername,
  styles,
}: Step1Props) => {
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
        <Heading mt={4}>Create your account</Heading>
      </Center>

      <Box style={styles.inner}>
        <FormControl>
          <FormControl.Label px={2} _text={{ fontWeight: 'normal' }}>
            Where your conversations will live
          </FormControl.Label>
          <Stack
            mb={8}
            borderBottomWidth={0.5}
            paddingBottom={2}
            borderColor={theme[colorMode || 'light'].button.primary.bgColor}>
            <Input
              pl={2}
              fontSize="sm"
              w="100%"
              variant="unstyled"
              value={server}
              onChangeText={onChange('server')}
              isDisabled={isDisabled}
              InputRightElement={
                <Button
                  variant="outline"
                  px={2.5}
                  py={1.5}
                  onPress={() => setIsDisabled(!isDisabled)}>
                  {isDisabled ? 'Edit' : 'Save'}
                </Button>
              }
              placeholder="Home server"
            />
          </Stack>
        </FormControl>

        <FormControl isInvalid={isUsernameExist}>
          <Stack mb={8}>
            <Input
              fontSize="md"
              w="100%"
              variant="unstyled"
              placeholder="Username"
              value={username}
              onChangeText={onChange('username')}
              onBlur={checkUsername}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              Username already taken
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>

        <FormControl>
          <Stack mb={8}>
            <Input
              type={isPassword ? 'password' : 'text'}
              fontSize="md"
              w="100%"
              variant="unstyled"
              placeholder="Password"
              value={password}
              onChangeText={onChange('password')}
              InputRightElement={
                <Pressable onPress={() => setIsPassword(!isPassword)} mr={2}>
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

        <Button onPress={onNext} isDisabled={!isAgree || isUsernameExist}>
          Next
        </Button>
        <Checkbox
          mt={4}
          value={'agree'}
          onChange={() => setIsAgree(!isAgree)}
          accessibilityLabel="I agree with the Terms of Use and Privacy Policy">
          <Box flexDirection="row" flexWrap="wrap" ml={0}>
            I agree with the <TUModal termsLink={termsLink} /> and <PPModal />
          </Box>
        </Checkbox>
      </Box>

      <Center flexDirection="row">
        Already have an account?{' '}
        <Button variant="link" size="sm" onPress={() => navigate('Login')}>
          Log in
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Step1;
