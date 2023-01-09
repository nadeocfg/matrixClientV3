import { VideoPlayerStoreModel } from '../../types/storeTypes';
import { CLEAR_STORE } from '../constants/mainConstants';
import {
  SET_VIDEO_FULLSCREEN,
  SET_VIDEO_URL,
} from '../constants/videoPlayerConstants';

const initialState: VideoPlayerStoreModel = {
  url: '',
  isFullScreen: false,
};

const videoPlayerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_VIDEO_URL:
      return {
        ...state,
        url: action.payload,
      };

    case SET_VIDEO_FULLSCREEN:
      return {
        ...state,
        isFullScreen: action.payload,
      };

    case CLEAR_STORE:
      return initialState;

    default:
      return state;
  }
};

export default videoPlayerReducer;
