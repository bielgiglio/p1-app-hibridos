import { useCallback, useEffect, useState } from 'react';
import { storage } from '../services/storage';

export function usePersistedState<T>(chave: string, inicial: T) {
  const [valor, setValor] = useState<T>(inicial);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    storage.get<T>(chave, inicial).then((v) => {
      setValor(v);
      setPronto(true);
    });
  }, [chave]);

  const atualizar = useCallback(
    (novo: T) => {
      setValor(novo);
      storage.set(chave, novo);
    },
    [chave]
  );

  return [valor, atualizar, pronto] as const;
}
