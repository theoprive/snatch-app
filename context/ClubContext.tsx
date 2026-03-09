// context/ClubContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Snatch = {
  id: string;
  title: string;
  date: string;
};

export type Club = {
  id: string;
  name: string;
  photoUri: string;
  admin: string;
  coAdmin: string;
  description?: string;
  upcomingSnatchs: Snatch[];
  pastSnatchs: Snatch[];
};

type ClubContextValue = {
  clubs: Club[];
  getClubById: (id: string) => Club | undefined;
  addClub: (club: Club) => void;
};

const ClubContext = createContext<ClubContextValue | undefined>(undefined);

export function ClubProvider({ children }: { children: ReactNode }) {
  const [clubs, setClubs] = useState<Club[]>([]);

  const getClubById = (id: string) => clubs.find(c => c.id === id);

  const addClub = (club: Club) => setClubs(prev => [...prev, club]);

  return (
    <ClubContext.Provider value={{ clubs, getClubById, addClub }}>
      {children}
    </ClubContext.Provider>
  );
}

export function useClub() {
  const ctx = useContext(ClubContext);
  if (!ctx) throw new Error('useClub must be used within a ClubProvider');
  return ctx;
}
