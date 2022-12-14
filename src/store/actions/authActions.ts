import { AuthResponseModel } from '../../types/storeTypes';
import { SET_AUTH_RESPONSE } from '../constants/authConstants';

export const setAuthResponse = (payload: AuthResponseModel) => {
  return {
    type: SET_AUTH_RESPONSE,
    payload,
  };
};
