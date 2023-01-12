import { IEventWithRoomId } from 'matrix-js-sdk';

export interface RoomEventInterface extends IEventWithRoomId {
  state_key?: string;
  prev_content?: any;
}
