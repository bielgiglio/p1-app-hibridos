import React, { createContext, useContext, useState } from 'react';

export interface UserSession {
  username: string;
  name: string;
}

interface AuthContextData {
  usuario: UserSession | null;
  entrar: (username: string) => void;
  sair: () => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<UserSession | null>(null);

  const entrar = (username: string) => {
    const cleanUser = username.trim() || 'meu_usuario';
    setUsuario({
      username: cleanUser,
      name: 'Gabriel Martins',
    });
  };

  const sair = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}
