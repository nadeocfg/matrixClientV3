import React, { PropsWithChildren } from 'react';
import { useAppDispatch } from '../hooks/useDispatch';
import { useAppSelector } from '../hooks/useSelector';
import {
  setColorMode as setColorModeAction,
  setLoader,
} from '../store/actions/mainActions';
import { StoreModel } from '../types/storeTypes';
import { navigate } from '../utils/navigation';
import { useColorMode, Text, Center, ScrollView, Button } from 'native-base';
import theme from '../themes/theme';
import NativeAlert from '../components/NativeAlert';

const Home: React.FC<PropsWithChildren<any>> = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state: StoreModel) => state.mainStore.isLoading,
  );
  const currentColorMode = useAppSelector(
    (state: StoreModel) => state.mainStore.colorMode,
  );
  const { colorMode, setColorMode } = useColorMode();

  const changeLoading = () => {
    dispatch(setLoader(!isLoading));
  };

  const changeColorMode = () => {
    const incomingMode = currentColorMode === 'dark' ? 'light' : 'dark';

    dispatch(setColorModeAction(incomingMode));
    setColorMode(incomingMode);
  };

  const showAlert = () => {
    NativeAlert('Alert title', 'alert message');
  };

  return (
    <ScrollView
      _light={{
        bg: theme.light.bgColor,
      }}
      _dark={{
        bg: theme.dark.bgColor,
      }}>
      <Center flex={1} px={4}>
        <Text fontSize="lg" display="flex" mb="10">
          This is Home screen
        </Text>
        <Text fontSize="lg" display="flex" mb="10">
          isLoading: {isLoading ? 'TRUE' : 'FALSE'}
        </Text>
        <Text fontSize="lg" display="flex" mb="10">
          colorMode: {colorMode}
        </Text>
        <Button onPress={changeLoading} mb="10">
          Set loader
        </Button>
        <Button onPress={() => navigate('Login')} mb="10">
          Go to Login
        </Button>
        <Button onPress={() => navigate('Registration')} mb="10">
          Go to Registration
        </Button>
        <Button onPress={changeColorMode} mb="10">
          Change color mode
        </Button>
        <Button onPress={showAlert} mb="10">
          Show Alert
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Home;
