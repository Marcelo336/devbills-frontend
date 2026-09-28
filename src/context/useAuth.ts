// src/context/useAuth.ts
import { useContext } from 'react';
import { AuthContext, type AuthContextProps } from './auth.types'; // <-- MUDANÇA AQUI!

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};