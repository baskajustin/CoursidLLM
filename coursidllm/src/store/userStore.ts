import { create } from "zustand";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  language: string;
}

interface UserStore {
  user: UserProfile | null;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  clearUser: () => set({ user: null, isLoading: false }),
}));
