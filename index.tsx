import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import App from './src/App';
import { navigationRef } from './src/utils/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { Provider } from 'react-redux';
import LoadingState from './src/screens/LoadingState';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { lightTheme } from './src/themes/light-theme';

const AppWrapper = () => {
  const theme = extendTheme({ colors: lightTheme });

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingState />} persistor={persistor}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer ref={navigationRef} theme={theme}>
            <App />
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
