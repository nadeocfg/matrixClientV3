import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import App from './src/App';
import { navigationRef } from './src/utils/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { Provider } from 'react-redux';
import LoadingState from './src/screens/LoadingState';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingState />} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <App />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
