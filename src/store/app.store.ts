import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      login: async (email, password) => {
       
        if (email === 'user@example.com' && password === 'password') {
          set({ token: 'mock-token' });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => set({ token: null }),
    }),
    { name: 'auth-storage' }
  )
);


export const useAppStore = create((set) => ({}));