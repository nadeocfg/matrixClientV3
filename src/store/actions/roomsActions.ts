import { RoomItemModel } from '../../types/storeTypes';
import {
  SET_NEED_UPDATE_CURRENT_ROOM,
  SET_ROOMS,
} from '../constants/roomsConstants';

export const setRooms = (payload: RoomItemModel[]) => {
  return {
    type: SET_ROOMS,
    payload,
  };
};

export const setNeedUpdateCurrentRoom = (payload: boolean) => {
  return {
    type: SET_NEED_UPDATE_CURRENT_ROOM,
    payload,
  };
};
