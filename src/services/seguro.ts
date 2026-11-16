import * as SecureStore from 'expo-secure-store';

export const seguro = {
  async salvar(chave: string, valor: string): Promise<void> {
    await SecureStore.setItemAsync(chave, valor);
  },

  async ler(chave: string): Promise<string | null> {
    return await SecureStore.getItemAsync(chave);
  },

  async apagar(chave: string): Promise<void> {
    await SecureStore.deleteItemAsync(chave);
  },
};
