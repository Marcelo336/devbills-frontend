// interface/src/context/AuthContext.tsx
import { useEffect, useState, type ReactNode } from 'react';
// MUDANÇA: Usar signInWithPopup em vez de signInWithRedirect
// Removido getRedirectResult
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'; 
import { firebaseAuth, googleAuthProvider } from '../config/firebase'; // Importado googleAuthProvider
import { AuthContext, type AuthContextProps, type UserState } from './auth.types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<UserState | null>(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);  
    
  // MUDANÇA CRUCIAL: Usar signInWithPopup
  const signInWithGoogle = async () => {
    try {
      setLoading(true); // Definir loading para true ao iniciar o login
      setError(null);
      console.log("DEBUG: AuthContext: Iniciando signInWithPopup...");
      const result = await signInWithPopup(firebaseAuth, googleAuthProvider); // Usar googleAuthProvider
      
      if (result && result.user) {
        const token = await result.user.getIdToken();
        console.log("Firebase ID Token (signInWithPopup Result):", token);
        // onAuthStateChanged irá disparar logo em seguida e definir o estado final.
        // Não precisamos definir authState aqui para manter onAuthStateChanged como fonte única de verdade.
      }
    } catch (err: unknown) {
      console.error("DEBUG: AuthContext: Erro no login com Google (popup):", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido no login com Google.");
      }
      setLoading(false); // Em caso de erro, defina loading como false
    }
  };

  const signOutUser = async () => {
    try {
      setLoading(true);
      setError(null);
      await signOut(firebaseAuth);
      console.log("DEBUG: AuthContext: Usuário deslogado.");
    } catch (err: unknown) {
      console.error("DEBUG: AuthContext: Erro no logout:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido no logout.");
      }
    } finally {
      // setLoading(false); // onAuthStateChanged gerencia o loading final
    }
  };

  // MUDANÇA: Remover o useEffect de getRedirectResult, pois não é usado com Popup
  // MUDANÇA: O useEffect principal (onAuthStateChanged) permanece para gerenciar o estado
  useEffect(() => {
    console.log("DEBUG: AuthContext: onAuthStateChanged listener iniciado.");
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      console.log("DEBUG: AuthContext: onAuthStateChanged disparou. User:", user ? user.uid : "null", "Loading antes:", loading);
      if (user) {        
        try {
          const token = await user.getIdToken();
          console.log("Firebase ID Token (onAuthStateChanged):", token); 
          setAuthState({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            token: token,
          });
          setError(null);
        } catch (tokenError) {
          console.error("DEBUG: AuthContext: Erro ao obter token do Firebase:", tokenError);
          setError("Erro ao obter token de autenticação.");
          setAuthState(null); 
        }
      } else {
        setAuthState(null);
        console.log("DEBUG: AuthContext: Usuário não autenticado (user is null).");
      }
      setLoading(false); 
      console.log("DEBUG: AuthContext: onAuthStateChanged finalizado. AuthState:", user ? user.uid : "null", "Loading depois:", false);
    });

    return () => {
      console.log("DEBUG: AuthContext: onAuthStateChanged unsubscribed.");
      unsubscribe();
    };
  }, []); 

  const contextValue: AuthContextProps = {
    authState,
    signInWithGoogle,
    signOut: signOutUser,
    loading,
    error,
  };

  console.log("DEBUG: AuthContext renderizado. AuthState:", authState ? authState.uid : "null", "Loading:", loading);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};