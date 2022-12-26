import { combineReducers } from 'redux';
import mainStore from './mainReducer';
import userStore from './userReducer';
import roomsStore from './roomsReducer';

const rootReducer = combineReducers({
  mainStore,
  userStore,
  roomsStore,
});

export default rootReducer;
