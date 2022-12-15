import { MainStoreModel } from '../../types/storeTypes';
import {
  CLEAR_STORE,
  SET_COLOR_MODE,
  SET_LOADER,
  SET_SNACKBAR,
} from '../constants/mainConstants';

const initialState: MainStoreModel = {
  isLoading: false,
  colorMode: 'dark',
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

    case SET_COLOR_MODE:
      return {
        ...state,
        colorMode: action.payload,
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
