import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import App from './src/App';
import { navigationRef } from './src/utils/navigation';

const AppWrapper = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <App />
    </NavigationContainer>
  );
};

export default AppWrapper;
