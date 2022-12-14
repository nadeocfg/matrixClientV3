import React, { PropsWithChildren } from 'react';
import { Button, Text } from 'react-native';
import { navigate } from '../utils/navigation';

const Registration: React.FC<PropsWithChildren<any>> = () => {
  return (
    <>
      <Text>This is Registration screen</Text>
      <Button title="Go to Login" onPress={() => navigate('Login')} />
    </>
  );
};

export default Registration;
