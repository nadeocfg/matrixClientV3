import { AuthStoreModel } from '../../types/storeTypes';
import { SET_AUTH_DATA, SET_AUTH_RESPONSE } from '../constants/authConstants';
import { CLEAR_STORE } from '../constants/mainConstants';

const initialState: AuthStoreModel = {
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
  authData: {
    server: 'matrix.org',
    username: '',
  },
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_AUTH_RESPONSE:
      return {
        ...state,
        authResponse: action.payload,
      };

    case SET_AUTH_DATA:
      return {
        ...state,
        authData: {
          ...state.authData,
          [action.payload.name]: action.payload.data,
        },
      };

    case CLEAR_STORE:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
