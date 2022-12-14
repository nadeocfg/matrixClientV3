import { RoomItemModel } from '../../types/storeTypes';
import { SET_ROOMS } from '../constants/roomsConstants';

export const setRooms = (payload: RoomItemModel[]) => {
  return {
    type: SET_ROOMS,
    payload,
  };
};
