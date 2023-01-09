import {
  SET_VIDEO_FULLSCREEN,
  SET_VIDEO_URL,
} from '../constants/videoPlayerConstants';

export const setVideoUrl = (payload: string) => {
  return {
    type: SET_VIDEO_URL,
    payload,
  };
};

export const setVideoFullscreen = (state: boolean) => {
  return {
    type: SET_VIDEO_FULLSCREEN,
    payload: state,
  };
};
