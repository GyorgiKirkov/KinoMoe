import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface RegistrationData {
  viewerOrArtist: 'viewer' | 'artist' | null;
  interests: string[];
  culturalPreferences: string[];
  subscriptionOption: string;
  email: string;
  password: string;
  confirmPassword: string;
  about: string;
  notificationPreferences: string[];
  experienceOption: string;
  profileImage: string;
  privacySetting: string;
  fullname: string;
  username: string;
  favoriteMovies: string[];
  watchLaterMovies: string[];
}

export interface RegistrationContextProps {
  registrationData: RegistrationData;
  setRegistrationData: (data: Partial<RegistrationData>) => void;
  resetRegistrationData: () => void;
}

export const RegistrationContext = createContext<RegistrationContextProps | undefined>(undefined);

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used in a RegistrationProvider');
  }
  return context;
};

const initialRegistrationData: RegistrationData = {
  viewerOrArtist: null,
  interests: [],
  culturalPreferences: [],
  subscriptionOption: "",
  email: "",
  password: "",
  confirmPassword: "",
  about: "",
  notificationPreferences: [],
  experienceOption: "",
  profileImage: "",
  privacySetting: "",
  fullname: "",
  username: "",
  favoriteMovies: [],
  watchLaterMovies: [],
};

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>(() => {
    const savedData = localStorage.getItem('registrationData');
    return savedData ? JSON.parse(savedData) : initialRegistrationData;
  });

  useEffect(() => {
    localStorage.setItem('registrationData', JSON.stringify(registrationData));
  }, [registrationData]);

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData((prev) => {
      const updatedData = { ...prev, ...data };
      localStorage.setItem('registrationData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const resetRegistrationData = () => {
    localStorage.removeItem('registrationData');
    setRegistrationData(initialRegistrationData);
  };

  return (
    <RegistrationContext.Provider value={{ registrationData, setRegistrationData: updateRegistrationData, resetRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
};
