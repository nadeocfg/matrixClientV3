import React, { useEffect, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Registration from './screens/Registration';
import Home from './screens/Home';
import { useColorMode } from 'native-base';
import { useAppSelector } from './hooks/useSelector';
import { StoreModel } from './types/storeTypes';
import Loader from './components/Loader';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './utils/navigation';
import ForgotPassword from './screens/ForgotPassword';
import ActionsDrawer from './components/ActionsDrawer';
import { MatrixContext } from './context/matrixContext';
import matrixSdk from './utils/matrix';
import { useAppDispatch } from './hooks/useDispatch';
import { setRooms } from './store/actions/roomsActions';
import RoomItem from './screens/RoomItem';
import RoomList from './screens/RoomList';
import { RootStackModel } from './types/rootStackType';
import validateUrl from './utils/validateUrl';
import CreateRoom from './screens/CreateRoom';
import ProfileSettings from './screens/ProfileSettings';
import { setUserAvatarAndName, setUserData } from './store/actions/userActions';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
} from './store/actions/mainActions';
import PasswordSettings from './screens/ProfileSettings/screens/PasswordSettings';
import DeactivateAccountSettings from './screens/ProfileSettings/screens/DeactivateAccountSettings';
import PersonalInformationSettings from './screens/ProfileSettings/screens/PersonalInformationSettings';
import RoomSettings from './screens/RoomSettings';
import RoomProfileSettings from './screens/RoomProfileSettings';
import RoomPermissionSettings from './screens/RoomPermissionSettings';

const App = () => {
  const { setColorMode } = useColorMode();
  const storeColorMode = useAppSelector(
    (state: StoreModel) => state.mainStore.colorMode,
  );
  const Stack = createNativeStackNavigator<RootStackModel>();
  const matrixContext = useContext(MatrixContext);
  const authResponse = useAppSelector(
    (state: StoreModel) => state.userStore.authResponse,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setColorMode(storeColorMode);

    checkInstance();
  }, []);

  const checkInstance = async () => {
    console.log(authResponse);
    if (authResponse.access_token) {
      // Create a new instance of matrix client
      const instance = await matrixSdk.createClient({
        baseUrl: validateUrl(authResponse.home_server),
        accessToken: authResponse.access_token,
        userId: authResponse.user_id,
        deviceId: authResponse.device_id,
        timelineSupport: true,
      });

      // Set new instance to context provider
      matrixContext.setInstance(instance);

      // Start matrix client
      instance
        .startClient({
          initialSyncLimit: 10,
          lazyLoadMembers: true,
          pollTimeout: 30000,
        })
        .then(async () => {
          const userData = await instance.getUser(authResponse.user_id);
          console.log(userData);
          if (userData) {
            dispatch(setUserData(userData));
          }

          instance.getProfileInfo(authResponse.user_id).then(res => {
            console.log(res);
            dispatch(
              setUserAvatarAndName({
                displayname: res.displayname || '',
                avatar_url: res.avatar_url || '',
              }),
            );
          });
        })
        .catch(err => {
          console.log({ ...err });
        });

      // Initial sync of matrix client
      instance.on('sync' as any, (state: string) => {
        if (state === 'ERROR') {
          return;
        }

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
                    membership: item.getMyMembership(),
                    avatar_url: item.getMxcAvatarUrl(),
                    unreadCount: item.getUnreadNotificationCount(),
                  };
                }),
            ),
          );
        }
      });
    }
  };

  // Check if route need authorization
  const onChangeRoute = ({ route, navigation }: any) => {
    const protectedRoutes = [
      'RoomItem',
      'RoomList',
      'CreateRoom',
      'ProfileSettings',
      'PersonalInformationSettings',
      'PasswordSettings',
      'DeactivateAccountSettings',
      'TermsOfUseSettings',
      'PrivacyPolicySettings',
    ];

    return {
      transitionEnd: () => {
        if (
          protectedRoutes.includes(route.name) &&
          !authResponse.access_token
        ) {
          dispatch(
            setActionsDrawerContent({
              title: 'Route error',
              text: 'You are not logged in',
            }),
          );

          dispatch(setActionsDrawerVisible(true));

          if (!navigation.canGoBack()) {
            return navigation.push('Login');
          }

          return navigation.goBack();
        }
      },
    };
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenListeners={onChangeRoute} initialRouteName="Home">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={Registration}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RoomList"
          component={RoomList}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CreateRoom"
          component={CreateRoom}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RoomItem"
          component={RoomItem}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RoomSettings"
          component={RoomSettings}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RoomProfileSettings"
          component={RoomProfileSettings}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ProfileSettings"
          component={ProfileSettings}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PasswordSettings"
          component={PasswordSettings}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PersonalInformationSettings"
          component={PersonalInformationSettings}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DeactivateAccountSettings"
          component={DeactivateAccountSettings}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TermsOfUseSettings"
          component={PasswordSettings}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PrivacyPolicySettings"
          component={PasswordSettings}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RoomPermissionSettings"
          component={RoomPermissionSettings}
        />
      </Stack.Navigator>

      <Loader />
      <ActionsDrawer />
    </NavigationContainer>
  );
};

export default App;
