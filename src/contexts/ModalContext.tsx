import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);

  const value = {
    showLogin,
    setShowLogin
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}; 