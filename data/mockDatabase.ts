// data/mockDatabase.ts

export type User = {
  id: string;
  email: string; // student mail
  personalEmail?: string; // user/personal email to create a profile 
  firstName?: string;
  lastName?: string;
  username?: string; // pseudo in public 
  birthYear?: number;
  campus?: string;
  photoUri?: string;
  bio?: string;
  hasProfile: boolean;
  adminClub?: string;      // club dont il est admin principal
  coAdminClubs?: string[]; // clubs où il est co-admin
  memberClubs?: string[];  // clubs où il est simple membre
};

export type Club = {
  id: string;
  name: string;
  admin: string;          // admin principal (unique)
  coAdmins?: string[];    // co-admins (optionnels, multiples)
  members?: string[];     // membres simples
  description?: string;
};

export type Snatch = {
  id: string;
  title: string;
  clubId?: string | null;
  authorId: string;
  publishedAt: string;
  content?: string;        // description longue
  videoUri?: any;
  image?: any;             // poster / image principale
  participants: string[];
  startDate: string;
  endDate?: string;
  location?: string;

  // Nouveaux champs
  visibility?: string;     // Mon campus / Public / Groupe
  capacity?: string;       // Illimitée / nombre max
  price?: string;          // Gratuit / montant
  checkInEnabled?: boolean;
  categoryIds?: string[];  // pour filtrer explore
  gallery?: any[];         // images secondaires
};


// ---------- Users ----------
export const mockUsers: User[] = [
    {
      id: "u_théo",
      email: "theo@kedgebs.com",
      firstName: "Théo",
      campus: "Kedge Bordeaux",
      hasProfile: true,
      adminClub: "c_photo",
      coAdminClubs: ["c_surf"],
      memberClubs: [],
      username: "theo_photo",
      photoUri: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: "u_louis",
      email: "louis@kedgebs.com",
      firstName: "Louis",
      campus: "Kedge Bordeaux",
      hasProfile: true,
      coAdminClubs: ["c_photo"],
      memberClubs: ["c_surf"],
      username: "louis_surf",
      photoUri: 'https://randomuser.me/api/portraits/men/33.jpg'
    },
    {
      id: "u_samy",
      email: "samy@kedgebs.com",
      firstName: "Samy",
      hasProfile: true,
      adminClub: "c_laconfig",
      memberClubs: [],
      username: "samy_admin",
      photoUri: 'https://randomuser.me/api/portraits/men/34.jpg'
    },
    {
      id: "u_nouvel",
      email: "n@kedgebs.com",
      firstName: "Nouvel",
      hasProfile: false,
      memberClubs: [],
      username: "nouvel_user",
      photoUri: 'https://randomuser.me/api/portraits/men/35.jpg'
    },
    {
      id: "u_ines",
      email: "ines@kedgebs.com",
      firstName: "Ines",
      hasProfile: true,
      adminClub: "c_surf",
      memberClubs: [],
      username: "ines_surf",
      photoUri: 'https://randomuser.me/api/portraits/women/32.jpg'
    }
  ];


// ---------- Clubs ----------
export const mockClubs: Club[] = [
  {
    id: "c_laconfig",
    name: "LaConfig",
    admin: "u_samy",
    members: [],
    description: "Club pilote de la plateforme"
  },
  {
    id: "c_photo",
    name: "Club Photo",
    admin: "u_théo",
    coAdmins: ["u_louis"],
    members: [],
    description: "Club photo de Kedge Bordeaux"
  },
  {
    id: "c_surf",
    name: "Club Surf",
    admin: "u_ines",
    coAdmins: ["u_théo"],
    members: ["u_louis"],
    description: "Club de glisse et d’aventure"
  }
];

// ---------- Snatchs ----------
export const mockSnatchs: Snatch[] = [
  {
    id: "s_001",
    title: "Snatch Zero",
    clubId: "c_laconfig",
    authorId: "u_samy",
    publishedAt: new Date().toISOString(),
    content: "Un premier Snatch pour tester la plateforme et rejoindre le club LaConfig. jiojfioewfio jewiof joiewj fiojwe iof jioewf jioewjfioewj fioewjfio jewiofjew fjwej fiowejif ewjfioewjfioewjiofjewio fjiew jfioewj iewj iowe jfiewjfioewjf",
    videoUri: require('../assets/videos/laconfig_reel.mp4'),
    image: require('../assets/images/eventPosterLarge.png'),
    participants: [], 
    startDate: "2025-11-06T20:00:00",
    endDate: "2025-11-06T23:00:00",
    location: "Kedge Bordeaux", 
  },
];

