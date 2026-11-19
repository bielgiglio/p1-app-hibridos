import { storage } from './storage';

interface CacheItem<T> {
  dados: T;
  expiraEm: number;
}

const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutos

export const cache = {
  async get<T>(chave: string): Promise<{ dados: T; expirado: boolean } | null> {
    const item = await storage.get<CacheItem<T> | null>(`cache:${chave}`, null);
    if (!item) return null;

    const expirado = Date.now() > item.expiraEm;
    return { dados: item.dados, expirado };
  },

  async set<T>(chave: string, dados: T, ttlMs: number = DEFAULT_TTL_MS): Promise<void> {
    const item: CacheItem<T> = {
      dados,
      expiraEm: Date.now() + ttlMs,
    };
    await storage.set(`cache:${chave}`, item);
  },

  async clear(chave: string): Promise<void> {
    await storage.remove(`cache:${chave}`);
  },
};
