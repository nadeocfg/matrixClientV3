import { AuthResponseModel, UserDataModel } from '../../types/storeTypes';
import {
  SET_AUTH_RESPONSE,
  SET_USER_AVATAR_AND_NAME,
  SET_USER_DATA,
} from '../constants/userConstants';

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

export const setUserAvatarAndName = (payload: {
  displayname: string;
  avatar_url: string;
}) => {
  return {
    type: SET_USER_AVATAR_AND_NAME,
    payload,
  };
};
