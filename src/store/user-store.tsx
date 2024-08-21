import { create } from "zustand";

export interface User {
  id: string; 
  email: string;
  password: string;
  fullname: string;
  username: string;
  interests: string[];
  tutorial: boolean;
  cultures: string[];
  culturalPreferences: string[];  
  favoriteCategories: string[];
  favoriteMovies: string[];
  profileImage: string;
  comments: string[],  
  commentsNumber: number,
  shardMovies: number,
  invites: number,
  timeSpendOnWatching: number,
  competedProfile: boolean,
}

interface UserStore {
  user: User | null;
  setUser: (userPayload: User) => void;
}

const userToken = localStorage.getItem("user");

export const useUserStore = create<UserStore>((set) => ({
  user: userToken ? JSON.parse(userToken) : null,
  setUser: (userPayload) => {
    localStorage.setItem("user", JSON.stringify(userPayload));
    set({ user: userPayload });
  },
}));
