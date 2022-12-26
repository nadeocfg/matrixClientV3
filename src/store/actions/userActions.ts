import { AuthResponseModel, UserDataModel } from '../../types/storeTypes';
import { SET_AUTH_RESPONSE, SET_USER_DATA } from '../constants/userConstants';

export const setAuthResponse = (payload: AuthResponseModel) => {
  return {
    type: SET_AUTH_RESPONSE,
    payload,
  };
};

export const setUserData = (payload: UserDataModel) => {
  return {
    type: SET_USER_DATA,
    payload,
  };
};
