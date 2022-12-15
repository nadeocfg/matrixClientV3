import { SnackbarModel } from '../../types/storeTypes';
import {
  SET_COLOR_MODE,
  SET_LOADER,
  SET_SNACKBAR,
} from '../constants/mainConstants';

export const setLoader = (payload: boolean) => {
  return {
    type: SET_LOADER,
    payload,
  };
};

export const setColorMode = (payload: 'light' | 'dark') => {
  return {
    type: SET_COLOR_MODE,
    payload,
  };
};

export const setSnackbar = (payload: SnackbarModel) => {
  return {
    type: SET_SNACKBAR,
    payload,
  };
};
