// src/context/auth.types.ts

import { createContext } from 'react';

export interface UserState {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  token?: string;
}

export interface AuthContextProps {
  authState: UserState | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  error: string | null; // Adicionei um estado de erro ao contexto
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);