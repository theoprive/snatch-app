// SnatchContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { Snatch, mockSnatchs } from '../data/mockDatabase';

type SnatchContextType = {
  snatchs: Snatch[];
  addSnatch: (snatch: Snatch) => void;
};

const SnatchContext = createContext<SnatchContextType | undefined>(undefined);

export const SnatchProvider = ({ children }: { children: React.ReactNode }) => {
  const [snatchs, setSnatchs] = useState<Snatch[]>(mockSnatchs);

  const addSnatch = (snatch: Snatch) => {
    setSnatchs(prev => [snatch, ...prev]);
  };

  return (
    <SnatchContext.Provider value={{ snatchs, addSnatch }}>
      {children}
    </SnatchContext.Provider>
  );
};

export const useSnatchs = () => {
  const context = useContext(SnatchContext);
  if (!context) throw new Error('useSnatchs must be used within SnatchProvider');
  return context;
};
