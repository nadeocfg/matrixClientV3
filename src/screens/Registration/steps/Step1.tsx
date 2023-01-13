import {
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  Heading,
  IconButton,
  Input,
  ScrollView,
  useColorMode,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';
import { StyleProp } from 'react-native';
import DefaultAvatar from '../../../components/DefaultAvatar';
import { CloseEyeIcon, EyeIcon } from '../../../components/icons';
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
  isNewPasswordValid: boolean;
  onChange: Function;
  setIsDisabled: Function;
  setIsPassword: Function;
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
  isNewPasswordValid,
  onNext,
  styles,
}: Step1Props) => {
  const { colorMode } = useColorMode();

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
        <Heading mt={4}>Create your account</Heading>
      </Center>

      <Box style={styles.inner}>
        <FormControl
          mb={4}
          borderBottomWidth={0.5}
          borderBottomColor={theme.border}
          paddingBottom={0}>
          <FormControl.Label px={2} _text={{ fontWeight: 'normal' }}>
            Where your conversations will live
          </FormControl.Label>
          <Input
            pl={2}
            fontSize="sm"
            w="100%"
            variant="withButton"
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
        </FormControl>

        <FormControl mb={2} isInvalid={isUsernameExist}>
          <FormControl.Label>Username</FormControl.Label>
          <Input
            fontSize="md"
            w="100%"
            variant="unstyled"
            value={username}
            onChangeText={onChange('username')}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Username already taken
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl mb={8} isInvalid={!isNewPasswordValid}>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            type={isPassword ? 'password' : 'text'}
            fontSize="md"
            w="100%"
            variant="unstyled"
            value={password}
            onChangeText={onChange('password')}
            InputRightElement={
              <IconButton
                onPress={() => setIsPassword(!isPassword)}
                variant="ghost"
                size="sm"
                width={8}
                height={8}
                mr={2}
                icon={
                  isPassword ? (
                    <CloseEyeIcon
                      color={
                        colorMode === 'light'
                          ? theme.light.lightText
                          : theme.dark.text
                      }
                    />
                  ) : (
                    <EyeIcon
                      color={
                        colorMode === 'light'
                          ? theme.light.lightText
                          : theme.dark.text
                      }
                    />
                  )
                }
              />
            }
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Password must contain lowercase, uppercase, number, special
            character and at least 8 characters in length
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          onPress={onNext}
          isDisabled={!isAgree || isUsernameExist || !isNewPasswordValid}>
          Next
        </Button>
        <Checkbox
          variant="primary"
          mt={4}
          value={'agree'}
          onChange={() => setIsAgree(!isAgree)}
          accessibilityLabel="I agree with the Terms of Use and Privacy Policy">
          <Box flexDirection="row" flexWrap="wrap" ml={0}>
            I agree with the <TUModal termsLink={termsLink} />
          </Box>
        </Checkbox>
      </Box>

      <Center flexDirection="row" mb={4}>
        Already have an account?{' '}
        <Button variant="link" size="sm" onPress={() => navigate('Login')}>
          Log in
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Step1;
