import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Input,
  Pressable,
  ScrollView,
  Stack,
  useColorMode,
} from 'native-base';
import React, { PropsWithChildren, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CloseEyeIcon, EyeIcon } from '../../components/icons';
import { MatrixContext } from '../../context/matrixContext';
import { useAppDispatch } from '../../hooks/useDispatch';
import { setAuthResponse } from '../../store/actions/authActions';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
} from '../../store/actions/mainActions';
import { setRooms } from '../../store/actions/roomsActions';
import theme from '../../themes/theme';
import matrixSdk from '../../utils/matrix';
import { navigate } from '../../utils/navigation';

const Login: React.FC<PropsWithChildren<any>> = () => {
  const [formData, setFormData] = useState({
    server: 'matrix.org',
    username: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const { colorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const matrixContext = useContext(MatrixContext);

  const onChange = (name: string) => (value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = async () => {
    const { username, password, server } = formData;

    // Check required fields
    if (!username || !password || !server) {
      dispatch(
        setActionsDrawerContent({
          title: 'Error',
          text: 'All fields are required',
          actions: [
            {
              title: 'Close',
              onPress: () => dispatch(setActionsDrawerVisible(false)),
            },
          ],
        }),
      );

      dispatch(setActionsDrawerVisible(true));
      return;
    }

    // Set loader true
    dispatch(setLoader(true));

    // Stop previous matrix client instance
    await matrixContext.instance?.stopClient();

    // Create a new matrix client instance
    const instance = await matrixSdk.createClient({
      baseUrl: `https://${server}/`,
      deviceId: 'matrix-client-app',
    });

    // Set matrix client instance to React context
    matrixContext.setInstance(instance);

    // Login into matrix network
    instance
      .loginWithPassword(username, password)
      .then(res => {
        dispatch(setAuthResponse(res));

        // Start matrix client
        instance.startClient({
          initialSyncLimit: 1,
          includeArchivedRooms: false,
          lazyLoadMembers: true,
        });
      })
      .catch(err => {
        dispatch(
          setActionsDrawerContent({
            title: err.data?.errcode || '',
            text: err.data?.error || 'Something went wrong',
            actions: [
              {
                title: 'Close',
                onPress: () => dispatch(setActionsDrawerVisible(false)),
              },
            ],
          }),
        );

        dispatch(setActionsDrawerVisible(true));
      });

    // Initial sync of matrix client
    instance.on('sync' as any, (state: string) => {
      console.log('STATE');
      console.log(state);
      dispatch(setLoader(false));

      // Get rooms(Chats)
      const rooms = instance.getRooms();
      console.log(rooms);

      if (rooms.length > 0) {
        dispatch(
          setRooms(
            rooms.map(item => {
              return {
                myUserId: item.myUserId,
                name: item.name,
                normalizedName: item.normalizedName,
                roomId: item.roomId,
                timeline: item.timeline,
              };
            }),
          ),
        );
      }
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
            <FormControl.Label _text={{ fontWeight: 'normal' }} pl={2}>
              Where your conversations will live
            </FormControl.Label>
            <Stack
              mb={8}
              borderBottomWidth={0.5}
              paddingBottom={2}
              borderColor={theme[colorMode || 'light'].button.primary.bgColor}>
              <Input
                fontSize="sm"
                w="100%"
                variant="unstyled"
                value={formData.server}
                onChangeText={onChange('server')}
                isDisabled={isDisabled}
                InputRightElement={
                  <Button
                    size="sm"
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
            <Stack mb={8}>
              <Input
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
            <Stack mb={8}>
              <Input
                type={isPassword ? 'password' : 'text'}
                fontSize="md"
                w="100%"
                variant="unstyled"
                placeholder="Password"
                value={formData.password}
                onChangeText={onChange('password')}
                InputRightElement={
                  <Pressable mr={2} onPress={() => setIsPassword(!isPassword)}>
                    {isPassword ? (
                      <CloseEyeIcon color="#000" />
                    ) : (
                      <EyeIcon color="#000" />
                    )}
                  </Pressable>
                }
              />
              <Flex direction="row-reverse">
                <Button
                  variant="link"
                  size="sm"
                  onPress={() => navigate('ForgotPassword')}>
                  Forgot password
                </Button>
              </Flex>
            </Stack>
          </FormControl>

          <Button onPress={login}>Log in</Button>
        </Box>

        <Center flexDirection="row">
          Don’t have an account?{' '}
          <Button
            variant="link"
            size="sm"
            onPress={() => navigate('Registration')}>
            Sign up
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
