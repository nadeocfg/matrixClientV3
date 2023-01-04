export type RootStackModel = {
  Home: undefined;
  Login: undefined;
  ForgotPassword: { server: string };
  Registration: undefined;
  RoomItem: { roomId: string; roomName: string };
  RoomList: undefined;
  CreateRoom: undefined;
  ProfileSettings: undefined;
  PersonalInformationSettings: undefined;
  PasswordSettings: undefined;
  DeactivateAccountSettings: undefined;
  TermsOfUseSettings: undefined;
  PrivacyPolicySettings: undefined;
  RoomSettings: { roomId: string };
};
