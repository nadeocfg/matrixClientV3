import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  IconButton,
  Input,
  ScrollView,
  Text,
} from 'native-base';
import React from 'react';
import { StyleProp } from 'react-native';
import DefaultAvatar from '../../../components/DefaultAvatar';
import { CloseEyeIcon, EyeIcon } from '../../../components/icons';
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
        <DefaultAvatar name="A" width={32} fontSize={48} />
        <Heading mt={4}>Choose a new password</Heading>
        <Text mt={4}>Make sure it’s 8 characters or more</Text>
      </Center>

      <Box style={styles.inner}>
        <FormControl mb={8}>
          <FormControl.Label>New Password</FormControl.Label>
          <Input
            type={isPassword ? 'password' : 'text'}
            fontSize="md"
            w="100%"
            variant="unstyled"
            value={password}
            onChangeText={onChange('password')}
            InputRightElement={
              <IconButton
                onPress={onChange('isPassword')}
                variant="ghost"
                size="sm"
                width={8}
                height={8}
                mr={2}
                icon={
                  isPassword ? (
                    <CloseEyeIcon color={theme.light.lightText} />
                  ) : (
                    <EyeIcon color={theme.light.lightText} />
                  )
                }
              />
            }
          />
        </FormControl>

        <Button onPress={onNext}>Reset Password</Button>
      </Box>
    </ScrollView>
  );
};

export default Step3;
