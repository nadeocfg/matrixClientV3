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
  useColorMode,
} from 'native-base';
import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet } from 'react-native';
import { CloseEyeIcon, EyeIcon } from '../components/icons';
import theme from '../themes/theme';
import { navigate } from '../utils/navigation';

const Login: React.FC<PropsWithChildren<any>> = () => {
  const [formData, setFormData] = useState({
    server: 'matrix.org',
    username: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPassword, setIsPassword] = useState(false);
  const { colorMode } = useColorMode();

  const onChange = (name: string) => (value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
      <Box style={styles.inner}>
        <Center mb={12}>
          <Heading>Welcome back!</Heading>
        </Center>

        <Box style={styles.inner}>
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
                value={formData.server}
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
                value={formData.username}
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
                value={formData.password}
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

          <Button>Next</Button>
        </Box>

        <Center flexDirection="row">
          Already have an account?{' '}
          <Button variant="link" onPress={() => navigate('Registration')}>
            Log in
          </Button>
        </Center>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});

export default Login;
