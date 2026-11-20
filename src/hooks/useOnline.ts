import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export function useOnline(): boolean {
  const [online, setOnline] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const conectado = Boolean(state.isConnected && state.isInternetReachable !== false);
      setOnline(conectado);
    });

    return () => unsubscribe();
  }, []);

  return online;
}
