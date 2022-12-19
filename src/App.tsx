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
import { setLoader } from './store/actions/mainActions';

const App = () => {
  const { setColorMode } = useColorMode();
  const storeColorMode = useAppSelector(
    (state: StoreModel) => state.mainStore.colorMode,
  );
  const Stack = createNativeStackNavigator();
  const matrixContext = useContext(MatrixContext);
  const authResponse = useAppSelector(
    (state: StoreModel) => state.authStore.authResponse,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setColorMode(storeColorMode);

    checkInstance();

    return () => {
      matrixContext.instance?.stopClient();
    };
  }, []);

  const checkInstance = async () => {
    if (authResponse.access_token) {
      dispatch(setLoader(true));

      // Create a new instance of matrix client
      const instance = await matrixSdk.createClient({
        baseUrl: `https://${authResponse.home_server}/`,
        accessToken: authResponse.access_token,
        userId: authResponse.user_id,
        deviceId: authResponse.device_id,
      });

      // Set new instance to context provider
      matrixContext.setInstance(instance);

      // Start matrix client
      instance.startClient({
        initialSyncLimit: 10,
        includeArchivedRooms: false,
        lazyLoadMembers: true,
      });

      // Initial sync of matrix client
      instance.once('sync' as any, (state: string) => {
        console.log('STATE');
        console.log(state);
        dispatch(setLoader(false));

        // Get rooms(Chats)
        const rooms = instance.getRooms();

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
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home">
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
      </Stack.Navigator>

      <Loader />
      <ActionsDrawer />
    </NavigationContainer>
  );
};

export default App;
