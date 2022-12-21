import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppSelector } from '../../hooks/useSelector';
import {
  clearStore,
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setColorMode as setColorModeAction,
  setLoader,
} from '../../store/actions/mainActions';
import { StoreModel } from '../../types/storeTypes';
import { navigate } from '../../utils/navigation';
import { useColorMode, Text, Center, ScrollView, Button } from 'native-base';
import theme from '../../themes/theme';
import { MatrixContext } from '../../context/matrixContext';
import LogOutButton from '../../components/LogOutButton';

const Home: React.FC<PropsWithChildren<any>> = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state: StoreModel) => state.mainStore.isLoading,
  );
  const currentColorMode = useAppSelector(
    (state: StoreModel) => state.mainStore.colorMode,
  );
  const { setColorMode } = useColorMode();
  const currentState = useAppSelector((state: StoreModel) => state);
  const matrixContext = useContext(MatrixContext);

  useEffect(() => {
    dispatch(setLoader(false));
  }, []);

  const changeLoading = () => {
    dispatch(setLoader(!isLoading));
  };

  const changeColorMode = () => {
    const incomingMode = currentColorMode === 'dark' ? 'light' : 'dark';

    dispatch(setColorModeAction(incomingMode));
    setColorMode(incomingMode);
  };

  const showDrawer = () => {
    dispatch(setActionsDrawerVisible(true));
    dispatch(
      setActionsDrawerContent({
        title: 'Error',
        text: 'Email not found',
        actions: [
          {
            title: 'OK',
            onPress: () => dispatch(setActionsDrawerVisible(false)),
          },
        ],
      }),
    );
  };

  const clearStoreAction = () => {
    dispatch(clearStore());
    navigate('Login');
    matrixContext.instance?.stopClient();
    matrixContext.setInstance(null);

    console.log(currentState);
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
        <Button onPress={changeLoading} mb="10">
          Set loader
        </Button>
        <Button onPress={() => navigate('Login')} mb="10">
          Go to Login
        </Button>
        <Button onPress={() => navigate('Registration')} mb="10">
          Go to Registration
        </Button>
        <Button onPress={() => navigate('RoomItem')} mb="10">
          Go to Room Item
        </Button>
        <Button onPress={() => navigate('RoomList')} mb="10">
          Go to Room List
        </Button>
        <Button onPress={changeColorMode} mb="10">
          Change color mode
        </Button>
        <Button onPress={showDrawer} mb="10">
          Show Drawer
        </Button>
        <LogOutButton mb={10} />
        <Button onPress={clearStoreAction} mb="10">
          Clear store
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Home;
