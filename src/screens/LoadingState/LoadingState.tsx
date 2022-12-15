import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

const LoadingState: React.FC<PropsWithChildren<any>> = () => {
  return (
    <View>
      <Text>State is loading...</Text>
    </View>
  );
};

export default LoadingState;
