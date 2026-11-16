import { storage } from './storage';

type EntradaCache<T> = {
  dados: T;
  salvoEm: number;
};

export async function comCache<T>(
  chave: string,
  buscar: () => Promise<T>,
  ttlMs = 5 * 60_000,
  forcarAtualizacao = false
): Promise<T> {
  const guardado = await storage.get<EntradaCache<T> | null>(chave, null);
  const fresco =
    !forcarAtualizacao && guardado && Date.now() - guardado.salvoEm < ttlMs;

  if (fresco) {
    return guardado.dados;
  }

  try {
    const dados = await buscar();
    await storage.set(chave, { dados, salvoEm: Date.now() });
    return dados;
  } catch (erro) {
    if (guardado) {
      return guardado.dados;
    }
    throw erro;
  }
}
