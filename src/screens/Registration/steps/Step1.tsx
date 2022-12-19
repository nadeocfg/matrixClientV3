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
  username,
  password,
  onChange,
  isDisabled,
  setIsDisabled,
  setIsPassword,
  isPassword,
  isAgree,
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
            pl={2}
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

        <FormControl>
          <Stack mb={8} px={2}>
            <Input
              px={0}
              fontSize="md"
              w="100%"
              variant="unstyled"
              placeholder="Username"
              value={username}
              onChangeText={onChange('username')}
              onBlur={checkUsername}
            />
          </Stack>
        </FormControl>

        <FormControl>
          <Stack mb={8} px={2}>
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
        <Checkbox
          mt={4}
          value={isAgree ? 'agree' : ''}
          onChange={onChange('isAgree')}
          accessibilityLabel="I agree with the Terms of Use and Privacy Policy">
          <Box flexDirection="row" flexWrap="wrap" ml={2}>
            I agree with the <TUModal /> and <PPModal />
          </Box>
        </Checkbox>
      </Box>

      <Center flexDirection="row">
        Already have an account?{' '}
        <Button variant="link" onPress={() => navigate('Login')}>
          Log in
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Step1;
