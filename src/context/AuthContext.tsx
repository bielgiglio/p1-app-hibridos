import React, { createContext, useContext, useEffect, useState } from 'react';
import { seguro } from '../services/seguro';
import { storage } from '../services/storage';

export interface UserSession {
  username: string;
  name: string;
  bio: string;
  avatar: string;
}

interface AuthContextData {
  usuario: UserSession | null;
  pronto: boolean;
  entrar: (username: string, customName?: string) => Promise<void>;
  atualizarPerfil: (dados: Partial<UserSession>) => Promise<void>;
  sair: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | null>(null);

const SESSION_KEY = 'app:v1:sessao';
const TOKEN_KEY = 'auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<UserSession | null>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    async function hidratarSessao() {
      try {
        const [sessaoSalva, tokenSalvo] = await Promise.all([
          storage.get<UserSession | null>(SESSION_KEY, null),
          seguro.ler(TOKEN_KEY),
        ]);

        if (sessaoSalva && tokenSalvo) {
          setUsuario(sessaoSalva);
        }
      } finally {
        setPronto(true);
      }
    }

    hidratarSessao();
  }, []);

  const entrar = async (username: string, customName?: string) => {
    const cleanUser = username.trim() || 'meu_usuario';
    const novaSessao: UserSession = {
      username: cleanUser,
      name: customName?.trim() || 'Gabriel Martins',
      bio: 'Desenvolvimento de interfaces mobile com React Native e Expo.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    };

    const fakeJwtToken = `jwt_${cleanUser}_${Date.now()}`;

    await Promise.all([
      storage.set(SESSION_KEY, novaSessao),
      seguro.salvar(TOKEN_KEY, fakeJwtToken),
    ]);

    setUsuario(novaSessao);
  };

  const atualizarPerfil = async (dados: Partial<UserSession>) => {
    if (!usuario) return;
    const atualizado = { ...usuario, ...dados };
    await storage.set(SESSION_KEY, atualizado);
    setUsuario(atualizado);
  };

  const sair = async () => {
    await Promise.all([
      storage.remove(SESSION_KEY),
      seguro.apagar(TOKEN_KEY),
    ]);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, pronto, entrar, atualizarPerfil, sair }}>
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
