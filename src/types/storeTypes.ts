import { MatrixEvent } from 'matrix-js-sdk';

export interface StoreModel {
  mainStore: MainStoreModel;
  userStore: UserStoreModel;
  roomsStore: RoomsModel;
  videoStore: VideoPlayerStoreModel;
}

export interface MainStoreModel {
  isLoading: boolean;
  colorMode: 'dark' | 'light';
  snackbar: SnackbarModel;
  actionsDrawer: ActionsDrawerModel;
}

export interface ActionsDrawerModel {
  isVisible: boolean;
  content: ActionsDrawerContentModel;
}

export interface ActionsDrawerContentModel {
  title: string;
  text: string;
  actions?: ActionsDrawerActionModel[];
}

export interface ActionsDrawerActionModel {
  title: string;
  desc?: string;
  onPress: () => void;
}

export interface SnackbarModel {
  type: 'error' | 'success' | 'warning';
  message: string;
  isVisible: boolean;
}

export interface UserStoreModel {
  authResponse: AuthResponseModel;
  user: UserDataModel;
}

export interface AuthResponseModel {
  user_id: string;
  access_token: string;
  home_server: string;
  device_id: string;
  well_known: {
    'm.homeserver': {
      base_url: string;
    };
  };
}

export interface UserDataModel {
  userId: string;
  displayName: string;
  rawDisplayName: string;
  avatarUrl: string;
  presenceStatusMsg: string;
  presence: string;
  lastActiveAgo: number;
  lastPresenceTs: number;
  currentlyActive: boolean;
}

export interface RoomsModel {
  rooms: RoomItemModel[];
  needUpdateCurrentRoom: boolean;
}

export interface RoomItemModel {
  myUserId: string;
  name: string;
  normalizedName: string;
  roomId: string;
  timeline: MatrixEvent[];
  avatar_url: string | null;
  membership: string;
  unreadCount: number | undefined;
}

export interface TimelineItemModel {
  content: {
    body: string;
    format: string;
    formatted_body: string;
    msgtype:
      | 'm.text'
      | 'm.audio'
      | 'm.location'
      | 'm.video'
      | 'm.image'
      | 'm.file'
      | 'm.emote'
      | 'm.notice';
  };
  origin_server_ts: number;
  sender: string;
  type: string;
  unsigned: {};
  event_id: string;
  room_id: string;
}

export interface VideoPlayerStoreModel {
  url: string;
  isFullScreen: boolean;
}
