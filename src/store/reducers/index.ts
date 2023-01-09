import { combineReducers } from 'redux';
import mainStore from './mainReducer';
import userStore from './userReducer';
import roomsStore from './roomsReducer';
import videoStore from './videoPlayerReducer';

const rootReducer = combineReducers({
  mainStore,
  userStore,
  roomsStore,
  videoStore,
});

export default rootReducer;
