import {
  ActionsDrawerContentModel,
  SnackbarModel,
} from '../../types/storeTypes';
import {
  CLEAR_STORE,
  SET_ACTIONS_DRAWER_CONTENT,
  SET_ACTIONS_DRAWER_VISIBLE,
  SET_COLOR_MODE,
  SET_LOADER,
  SET_SNACKBAR,
} from '../constants/mainConstants';

export const clearStore = () => {
  console.log('CLEAR_STORE ACTION');
  return {
    type: CLEAR_STORE,
  };
};

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

export const setActionsDrawerVisible = (payload: boolean) => {
  return {
    type: SET_ACTIONS_DRAWER_VISIBLE,
    payload,
  };
};

export const setActionsDrawerContent = (payload: ActionsDrawerContentModel) => {
  return {
    type: SET_ACTIONS_DRAWER_CONTENT,
    payload,
  };
};
