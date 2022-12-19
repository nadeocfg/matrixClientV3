import React from 'react';
import App from './src/App';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { Provider } from 'react-redux';
import LoadingState from './src/screens/LoadingState';
import { extendTheme, NativeBaseProvider } from 'native-base';
import colors from './src/themes/colors';
import fonts from './src/themes/fonts';
import components from './src/themes/components';
import { MatrixContextProvider } from './src/context/matrixContext';

const AppWrapper = () => {
  const theme = extendTheme({
    ...fonts,
    components,
    colors,
    initialColorMode: 'dark',
    useSystemColorMode: false,
  });

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingState />} persistor={persistor}>
        <MatrixContextProvider>
          <NativeBaseProvider theme={theme}>
            <App />
          </NativeBaseProvider>
        </MatrixContextProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
