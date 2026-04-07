import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'u1',
    name: 'Demo Admin',
    email: 'admin@drive.net',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Demo+Admin&background=111827&color=fff',
  }, // Pre-logged in for demo purposes, can switch to 'user' for typical view
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
