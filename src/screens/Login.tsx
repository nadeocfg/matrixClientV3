import React, { PropsWithChildren } from 'react';
import { Button, Text } from 'react-native';
import { useAppDispatch } from '../hooks/useDispatch';
import { useAppSelector } from '../hooks/useSelector';
import { setLoader } from '../store/actions/mainActions';
import { StoreModel } from '../types/storeTypes';
import { navigate } from '../utils/navigation';

const Login: React.FC<PropsWithChildren<any>> = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state: StoreModel) => state.mainStore.isLoading,
  );

  return (
    <>
      <Text>This is Login screen</Text>
      <Text>isLoading: {isLoading ? 'TRUE' : 'FALSE'}</Text>
      <Button
        title="Set loader"
        onPress={() => dispatch(setLoader(!isLoading))}
      />
      <Button
        title="Go to Registration"
        onPress={() => navigate('Registration')}
      />
    </>
  );
};

export default Login;
