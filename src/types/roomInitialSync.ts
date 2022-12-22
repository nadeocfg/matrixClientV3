import {
  IEvent,
  IEventWithRoomId,
  IMinimalEvent,
  IStateEventWithRoomId,
  Visibility,
} from 'matrix-js-sdk';

export default interface IRoomInitialSyncResponse {
  room_id: string;
  membership: 'invite' | 'join' | 'leave' | 'ban';
  messages?: IMessagesChunk;
  state?: IStateEventWithRoomId[];
  visibility: Visibility;
  account_data?: IMinimalEvent[];
  presence: Partial<IEvent>; // legacy and undocumented, api is deprecated so this won't get attention
}

export interface IMessagesChunk {
  start?: string;
  end?: string;
  chunk: IEventWithRoomId[];
}
