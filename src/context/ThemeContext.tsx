import React, { createContext, useContext } from 'react';
import { darkColors, lightColors, ThemeColors } from '../constants/theme';
import { usePersistedState } from '../hooks/usePersistedState';

export type ThemeMode = 'claro' | 'escuro';

interface ThemeContextData {
  tema: ThemeColors;
  modo: ThemeMode;
  setModo: (novoModo: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextData | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [modo, setModo, pronto] = usePersistedState<ThemeMode>('app:v1:tema', 'claro');

  const isDark = modo === 'escuro';
  const tema = isDark ? darkColors : lightColors;

  if (!pronto) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ tema, modo, setModo, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTema deve ser utilizado dentro de um ThemeProvider');
  }
  return context;
}
