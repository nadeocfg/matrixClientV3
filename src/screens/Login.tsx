import React, { PropsWithChildren } from 'react';
import { Button, Text } from 'react-native';
import { navigate } from '../utils/navigation';

const Login: React.FC<PropsWithChildren<any>> = () => {
  return (
    <>
      <Text>This is Login screen</Text>
      <Button
        title="Go to Registration"
        onPress={() => navigate('Registration')}
      />
    </>
  );
};

export default Login;
