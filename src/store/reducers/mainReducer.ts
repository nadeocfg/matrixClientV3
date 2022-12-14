import { MainStoreModel } from '../../types/storeTypes';
import {
  CLEAR_STORE,
  SET_DARK_MODE,
  SET_LOADER,
  SET_SNACKBAR,
} from '../constants/mainConstants';

const initialState: MainStoreModel = {
  isLoading: false,
  isDarkMode: false,
  snackbar: {
    type: 'error',
    message: '',
    isVisible: false,
  },
};

const mainReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_DARK_MODE:
      return {
        ...state,
        isDarkMode: action.payload,
      };

    case SET_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      };

    case CLEAR_STORE:
      return initialState;

    default:
      return state;
  }
};

export default mainReducer;
