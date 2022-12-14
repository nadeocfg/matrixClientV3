import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

const LoadingState: React.FC<PropsWithChildren<any>> = () => {
  return (
    <>
      <Text>State is loading...</Text>
    </>
  );
};

export default LoadingState;
