import { useCallback, useEffect, useState } from 'react';

export function useFetch<T>(buscar: (forcar?: boolean) => Promise<T>) {
  const [dados, setDados] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(
    async (forcar = false) => {
      setLoading(true);
      setErro(null);
      try {
        const resultado = await buscar(forcar);
        setDados(resultado);
      } catch (e) {
        setErro((e as Error).message || 'Falha ao carregar dados');
      } finally {
        setLoading(false);
      }
    },
    [buscar]
  );

  useEffect(() => {
    carregar(false);
  }, [carregar]);

  return {
    dados,
    loading,
    erro,
    recarregar: () => carregar(true),
  };
}
