import React, { useEffect } from 'react';
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

const App = () => {
  const { setColorMode } = useColorMode();
  const storeColorMode = useAppSelector(
    (state: StoreModel) => state.mainStore.colorMode,
  );
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    setColorMode(storeColorMode);
  }, []);

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
          name="Registration"
          component={Registration}
        />
      </Stack.Navigator>

      <Loader />
    </NavigationContainer>
  );
};

export default App;
