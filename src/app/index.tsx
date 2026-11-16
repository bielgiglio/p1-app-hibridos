import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { usuario, pronto } = useAuth();

  if (!pronto) return null;

  return <Redirect href={usuario ? ('/(tabs)' as any) : '/login'} />;
}
