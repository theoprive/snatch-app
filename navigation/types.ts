// navigation/types.ts
import { User } from '../data/mockDatabase';
// Stack principal
// navigation/types.ts
export type AppStackParamList = {
  Splash: undefined;
  Access: undefined;
  VerificationScreen: { email: string };
  OupsScreen: undefined;
  WelcomeScreen: { user: User};
  MainTabs: undefined;
  ProfileCreate: undefined;
  SnatchDetail: {id : string};
};


// Bottom Tabs
export type MainTabsParamList = {
  Feed: undefined;
  Explorer: undefined;
  CreateSnatch: undefined;
  Chat: undefined;
  Profile: undefined;
};
