import React, { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppSelector } from '../../hooks/useSelector';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setColorMode as setColorModeAction,
  setLoader,
} from '../../store/actions/mainActions';
import { StoreModel } from '../../types/storeTypes';
import { navigate } from '../../utils/navigation';
import { useColorMode, Text, Center, ScrollView, Button } from 'native-base';
import theme from '../../themes/theme';
import LogOutButton from '../../components/LogOutButton';

const Home: React.FC<PropsWithChildren<any>> = () => {
  const dispatch = useAppDispatch();
  const currentColorMode = useAppSelector(
    (state: StoreModel) => state.mainStore.colorMode,
  );
  const { setColorMode } = useColorMode();

  useEffect(() => {
    dispatch(setLoader(false));
  }, []);

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
      }),
    );
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
        <Button onPress={() => navigate('Login')} mb="10">
          Go to Login
        </Button>
        <Button onPress={() => navigate('Registration')} mb="10">
          Go to Registration
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
        <LogOutButton />
      </Center>
    </ScrollView>
  );
};

export default Home;
