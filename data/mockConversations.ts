export type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
};

export type Conversation = {
  id: string;
  participants: string[]; // user ids
  messages: Message[];
};

export const mockConversations: Conversation[] = [
  {
    id: 'conv_001',
    participants: ['u_théo', 'u_louis'],
    messages: [
      { id: 'm_001', senderId: 'u_théo', content: 'Salut Louis !', timestamp: new Date().toISOString(), read: true },
      { id: 'm_002', senderId: 'u_louis', content: 'Hey Théo !', timestamp: new Date().toISOString(), read: true },
    ],
  },
  {
    id: 'conv_002',
    participants: ['u_théo', 'u_ines'],
    messages: [
      { id: 'm_003', senderId: 'u_ines', content: 'Tu viens à la soirée ?', timestamp: new Date().toISOString(), read: false },
    ],
  },
];

