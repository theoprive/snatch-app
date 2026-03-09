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
  SnatchPublished: { snatchId: string};
  SnatchScreen: undefined;
  MultipassScreen : undefined;
  ClubStack: undefined;
  
  ViewProfile: {
    userId?: string;
    firstName: string;
    lastName: string;
    pseudo: string;
    email: string;
    profileImage?: { uri: string } | number;

    instagram?: string;
    whatsapp?: string;
    snapchat?: string;

    participations: number;
    snatchsCreated: number;

    flashbacks?: string[]; // URLs images (mock pour l’instant)
    clubs?: {
      id: string;
      name: string;
      role: 'Admin' | 'Co-admin';
      image: any;
    }[];
  };

  ViewClub: {
    id: string;
    name: string;
    image?: any;
    description?: string;
    address?: string;
    followersCount: number;
    upcomingSnatchs?: any[];
    admins?: any[];
    flashbacks?: string[];
    whatsapp?: string;
    discord?: string;
  };

};


// Bottom Tabs
export type MainTabsParamList = {
  Feed: undefined;
  Explorer: undefined;
  CreateSnatch: undefined;
  Chat: undefined;
  Profile: undefined;
};

// navigation/types.ts
export type ChatStackParamList = {
  ChatHome: undefined;
  Conversation: { conversationId: string };
};

//ClubStack
export type ClubStackParamList = {
  CreateClubStep1: undefined;
  CreateClubStep2: {
    coAdmins: string[]; // si tu passes les admins du step 1 au step 2
  };
  ClubCreated: {
    clubId: string;
  };
  ClubProfile: {
    clubId: string;
  };
  ModifyClub: {
    clubId: string;
  };
};

