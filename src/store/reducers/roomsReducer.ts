import { RoomsModel } from '../../types/storeTypes';
import { CLEAR_STORE } from '../constants/mainConstants';
import { SET_ROOMS } from '../constants/roomsConstants';

const initialState: RoomsModel = {
  rooms: [],
};

const roomsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };

    case CLEAR_STORE:
      return initialState;

    default:
      return state;
  }
};

export default roomsReducer;
