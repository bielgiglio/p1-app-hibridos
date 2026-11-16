import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async get<T>(chave: string, padrao: T): Promise<T> {
    try {
      const bruto = await AsyncStorage.getItem(chave);
      return bruto ? (JSON.parse(bruto) as T) : padrao;
    } catch {
      return padrao;
    }
  },

  async set<T>(chave: string, valor: T): Promise<void> {
    await AsyncStorage.setItem(chave, JSON.stringify(valor));
  },

  async remove(chave: string): Promise<void> {
    await AsyncStorage.removeItem(chave);
  },
};
