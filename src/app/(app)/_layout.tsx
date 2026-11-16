import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="post-detail"
        options={{ headerShown: true, title: 'Publicação' }}
      />
    </Stack>
  );
}
