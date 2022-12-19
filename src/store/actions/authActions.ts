import { AuthResponseModel } from '../../types/storeTypes';
import { SET_AUTH_DATA, SET_AUTH_RESPONSE } from '../constants/authConstants';

export const setAuthResponse = (payload: AuthResponseModel) => {
  return {
    type: SET_AUTH_RESPONSE,
    payload,
  };
};

export const setAuthData = (payload: { name: string; data: any }) => {
  return {
    type: SET_AUTH_DATA,
    payload,
  };
};
