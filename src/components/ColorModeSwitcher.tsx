import { Fab, useColorMode } from 'native-base';
import React from 'react';
import { useAppDispatch } from '../hooks/useDispatch';
import { useAppSelector } from '../hooks/useSelector';
import { StoreModel } from '../types/storeTypes';
import { setColorMode as setColorModeAction } from '../store/actions/mainActions';

const ColorModeSwitcher = () => {
  const dispatch = useAppDispatch();
  const currentColorMode = useAppSelector(
    (state: StoreModel) => state.mainStore.colorMode,
  );
  const { setColorMode } = useColorMode();

  const changeColorMode = () => {
    const incomingMode = currentColorMode === 'dark' ? 'light' : 'dark';

    dispatch(setColorModeAction(incomingMode));
    setColorMode(incomingMode);
  };

  return (
    <Fab
      renderInPortal={false}
      onPress={changeColorMode}
      shadow={2}
      placement="top-right"
      size="xs"
      label="Change mode"
    />
  );
};

export default ColorModeSwitcher;
