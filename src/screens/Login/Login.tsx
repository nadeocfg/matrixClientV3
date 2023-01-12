import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  ScrollView,
  useColorMode,
} from 'native-base';
import React, { PropsWithChildren, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CloseEyeIcon, EyeIcon } from '../../components/icons';
import { MatrixContext } from '../../context/matrixContext';
import { useAppDispatch } from '../../hooks/useDispatch';
import { setAuthResponse, setUserData } from '../../store/actions/userActions';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
} from '../../store/actions/mainActions';
import { setRooms } from '../../store/actions/roomsActions';
import theme from '../../themes/theme';
import matrixSdk from '../../utils/matrix';
import { navigate, navigationRef } from '../../utils/navigation';
import validateUrl from '../../utils/validateUrl';

const Login: React.FC<PropsWithChildren<any>> = () => {
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState({
    server: 'dev.techwings.com:8448',
    username: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
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
      baseUrl: validateUrl(server),
      deviceId: 'matrix-client-app',
      timelineSupport: true,
    });

    // Set matrix client instance to React context
    matrixContext.setInstance(instance);

    // Login into matrix network
    instance
      .loginWithPassword(username, password)
      .then(async res => {
        dispatch(setAuthResponse(res));

        // Start matrix client
        instance.startClient({
          initialSyncLimit: 1,
          includeArchivedRooms: false,
          lazyLoadMembers: true,
        });

        const userData = await instance.getUser(res.user_id);

        if (userData) {
          dispatch(setUserData(userData));
        }

        navigationRef.reset({
          index: 0,
          routes: [{ name: 'RoomList' }],
        });
      })
      .catch(err => {
        console.log({ ...err });
        dispatch(
          setActionsDrawerContent({
            title: err.data?.errcode || '',
            text: err.data?.error || 'Something went wrong',
          }),
        );

        dispatch(setActionsDrawerVisible(true));
        dispatch(setLoader(false));
      });

    // Initial sync of matrix client
    instance.on('sync' as any, (state: string) => {
      console.log('STATE');
      console.log(state);
      dispatch(setLoader(false));

      // Get rooms(Chats)
      const rooms = instance.getVisibleRooms();
      console.log(rooms);

      if (rooms.length > 0) {
        dispatch(
          setRooms(
            rooms
              .sort((a, b) =>
                a.getMyMembership().localeCompare(b.getMyMembership()),
              )
              .map(item => {
                return {
                  myUserId: item.myUserId,
                  name: item.name,
                  normalizedName: item.normalizedName,
                  roomId: item.roomId,
                  timeline: item.timeline,
                  avatar_url: item.getMxcAvatarUrl(),
                  membership: item.getMyMembership(),
                  unreadCount: item.getUnreadNotificationCount(),
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
              value={formData.server}
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

          <FormControl mb={2}>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              fontSize="md"
              w="100%"
              variant="unstyled"
              value={formData.username}
              onChangeText={onChange('username')}
            />
          </FormControl>

          <FormControl mb={8}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type={isPassword ? 'password' : 'text'}
              fontSize="md"
              w="100%"
              variant="unstyled"
              value={formData.password}
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
            <Flex direction="row-reverse">
              <Button
                variant="link"
                size="sm"
                onPress={() =>
                  navigate('ForgotPassword', { server: formData.server })
                }>
                Forgot password
              </Button>
            </Flex>
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
