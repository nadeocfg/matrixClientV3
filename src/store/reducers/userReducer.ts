import { UserStoreModel } from '../../types/storeTypes';
import {
  SET_AUTH_RESPONSE,
  SET_USER_AVATAR_AND_NAME,
  SET_USER_DATA,
} from '../constants/userConstants';
import { CLEAR_STORE } from '../constants/mainConstants';

const initialState: UserStoreModel = {
  authResponse: {
    user_id: '',
    access_token: '',
    home_server: '',
    device_id: '',
    well_known: {
      'm.homeserver': {
        base_url: '',
      },
    },
  },
  user: {
    userId: '',
    displayName: '',
    rawDisplayName: '',
    avatarUrl: '',
    presenceStatusMsg: '',
    presence: '',
    lastActiveAgo: 3,
    lastPresenceTs: 1672053586910,
    currentlyActive: true,
  },
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_AUTH_RESPONSE:
      return {
        ...state,
        authResponse: action.payload,
      };

    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };

    case SET_USER_AVATAR_AND_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          displayName: action.payload.displayname,
          avatarUrl: action.payload.avatar_url,
        },
      };

    case CLEAR_STORE:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
