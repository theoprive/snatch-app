// data/mockConnexions.ts
import { User } from './mockDatabase';

export type ConnexionsUser = User & {
  lastSnatchParticipation?: string; // id du Snatch où il t'a croisé
  mutualConsent?: boolean;           // toggle "j'accepte d'être suggéré"
  isFriend?: boolean;                // si déjà ami
};

// Section "Amis d'amis"
export const friendsOfFriends: ConnexionsUser[] = [
  {
    id: "u_louis",
    firstName: "Louis",
    email: "louis@kedgebs.com",   // <--- obligatoire
    photoUri: "https://randomuser.me/api/portraits/men/33.jpg",
    hasProfile: true,
    mutualConsent: true,
    isFriend: false,
  },
  {
    id: "u_ines",
    firstName: "Ines",
    email: "ines@kedgebs.com",    // <--- obligatoire
    photoUri: "https://randomuser.me/api/portraits/women/32.jpg",
    hasProfile: true,
    mutualConsent: false,
    isFriend: false,
  },
];


// Section "Ceux qui ont été au même Snatch que toi" (disparaissent après 48h)
export const sameSnatchUsers: ConnexionsUser[] = [
  {
    id: "u_samy",
    firstName: "Samy",
    email: "samy@kedgebs.com",     // <--- obligatoire
    photoUri: "https://randomuser.me/api/portraits/men/34.jpg",
    hasProfile: true,
    mutualConsent: true,
    isFriend: false,
    lastSnatchParticipation: "s_001",
  },
];

