// context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCurrentUser, updateCurrentUser } from '../services/auth';
import type { User } from '../data/mockDatabase';

type UserContextValue = {
  currentUser: User | null;
  setCurrentUser: (u: User | null) => void;
  setAuthenticatedUser: (u: User | null) => void;
  patchCurrentUser: (patch: Partial<User>) => Promise<User | null>;
  loading: boolean;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const setAuthenticatedUser = (u: User | null) => {
    setCurrentUser(u);
  };

  const patchCurrentUser = async (patch: Partial<User>): Promise<User | null> => {
    const updated = await updateCurrentUser(patch);
    setCurrentUser(updated ?? null);
    return updated;
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        if (!mounted) return;
        setCurrentUser(user ?? null);
      } catch (err) {
        console.warn('UserProvider: failed to load current user', err);
        if (mounted) setCurrentUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, setAuthenticatedUser, patchCurrentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}
