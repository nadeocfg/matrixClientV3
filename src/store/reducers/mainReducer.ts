import { MainStoreModel } from '../../types/storeTypes';
import {
  CLEAR_STORE,
  SET_ACTIONS_DRAWER_CONTENT,
  SET_ACTIONS_DRAWER_VISIBLE,
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
  actionsDrawer: {
    isVisible: false,
    content: {
      title: '',
      text: '',
      actions: [],
    },
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

    case SET_ACTIONS_DRAWER_VISIBLE:
      return {
        ...state,
        actionsDrawer: {
          ...state.actionsDrawer,
          isVisible: action.payload,
        },
      };

    case SET_ACTIONS_DRAWER_CONTENT:
      return {
        ...state,
        actionsDrawer: {
          ...state.actionsDrawer,
          content: {
            title: action.payload.title,
            text: action.payload.text,
            actions: action.payload.actions || [],
          },
        },
      };

    case CLEAR_STORE:
      return initialState;

    default:
      return state;
  }
};

export default mainReducer;
