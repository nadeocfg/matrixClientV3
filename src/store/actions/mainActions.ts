import { SnackbarModel } from '../../types/storeTypes';
import {
  SET_DARK_MODE,
  SET_LOADER,
  SET_SNACKBAR,
} from '../constants/mainConstants';

export const setLoader = (payload: boolean) => {
  return {
    type: SET_LOADER,
    payload,
  };
};

export const setTheme = (payload: boolean) => {
  return {
    type: SET_DARK_MODE,
    payload,
  };
};

export const setSnackbar = (payload: SnackbarModel) => {
  return {
    type: SET_SNACKBAR,
    payload,
  };
};
