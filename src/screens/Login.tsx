import React, { PropsWithChildren } from 'react';
import { useAppDispatch } from '../hooks/useDispatch';
import { useAppSelector } from '../hooks/useSelector';
import { setLoader } from '../store/actions/mainActions';
import { StoreModel } from '../types/storeTypes';
import { navigate } from '../utils/navigation';
import { useColorMode, Text, Button, Center } from 'native-base';

const Login: React.FC<PropsWithChildren<any>> = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state: StoreModel) => state.mainStore.isLoading,
  );
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Center
      _light={{
        bg: 'coolGray.50',
      }}
      _dark={{
        bg: 'blueGray.800',
      }}
      flex={1}
      px={4}>
      <Text fontSize="lg" display="flex" mb="10">
        This is Login screen
      </Text>
      <Text fontSize="lg" display="flex" mb="10">
        isLoading: {isLoading ? 'TRUE' : 'FALSE'}
      </Text>
      <Text fontSize="lg" display="flex" mb="10">
        isDark: {colorMode}
      </Text>
      <Button onPress={() => dispatch(setLoader(!isLoading))}>
        Set loader
      </Button>
      <Button onPress={() => navigate('Registration')}>
        Go to Registration
      </Button>
      <Button onPress={toggleColorMode}>Change color mode</Button>
    </Center>
  );
};

export default Login;
