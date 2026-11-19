import { useCallback, useEffect, useRef, useState } from 'react';
import { cache } from '../services/cache';

interface UseFetchOptions {
  cacheKey?: string;
  ttlMs?: number;
}

export function useFetch<T>(
  fetcher: () => Promise<T>,
  options?: UseFetchOptions
) {
  const [dados, setDados] = useState<T | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [usandoCache, setUsandoCache] = useState<boolean>(false);

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const cacheKey = options?.cacheKey;
  const ttlMs = options?.ttlMs;

  const executar = useCallback(
    async (silencioso = false) => {
      if (!silencioso) {
        setCarregando(true);
      }
      setErro(null);

      let temCachePrevio = false;

      if (cacheKey) {
        const emCache = await cache.get<T>(cacheKey);
        if (emCache) {
          setDados(emCache.dados);
          temCachePrevio = true;
          if (!emCache.expirado) {
            setUsandoCache(false);
            setCarregando(false);
            return;
          }
        }
      }

      try {
        const resultado = await fetcherRef.current();
        setDados(resultado);
        setUsandoCache(false);
        if (cacheKey) {
          await cache.set(cacheKey, resultado, ttlMs);
        }
      } catch (e: any) {
        if (temCachePrevio) {
          setUsandoCache(true);
        } else {
          setErro(e?.message || 'Erro ao carregar os dados.');
        }
      } finally {
        setCarregando(false);
      }
    },
    [cacheKey, ttlMs]
  );

  useEffect(() => {
    executar();
  }, [executar]);

  const recarregar = useCallback(async () => {
    if (cacheKey) {
      await cache.clear(cacheKey);
    }
    await executar(true);
  }, [cacheKey, executar]);

  return { dados, carregando, erro, usandoCache, recarregar };
}
