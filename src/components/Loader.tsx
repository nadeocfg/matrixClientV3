import { Center, Heading, Spinner } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useAppSelector } from '../hooks/useSelector';
import theme from '../themes/theme';
import { StoreModel } from '../types/storeTypes';

const Loader = () => {
  const isLoding = useAppSelector(
    (state: StoreModel) => state.mainStore.isLoading,
  );

  if (!isLoding) {
    return <></>;
  }

  return (
    <Center
      style={styles.loading}
      _dark={{
        bg: theme.dark.transparentBg,
      }}
      _light={{
        bg: theme.light.transparentBg,
      }}>
      <Spinner accessibilityLabel="Loading" mb={2} />
      <Heading fontSize="md">Loading</Heading>
    </Center>
  );
};

const styles = StyleSheet.create({
  loading: {
    elevation: 1,
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
