import { combineReducers } from 'redux';
import mainStore from './mainReducer';
import authStore from './authReducer';
import roomsStore from './roomsReducer';

const rootReducer = combineReducers({
  mainStore,
  authStore,
  roomsStore,
});

export default rootReducer;
