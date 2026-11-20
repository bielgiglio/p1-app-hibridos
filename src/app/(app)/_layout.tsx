import { Redirect, Stack } from 'expo-router';
import { View } from 'react-native';
import OfflineBanner from '../../components/OfflineBanner';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { usuario, pronto } = useAuth();

  if (!pronto) return null;

  if (!usuario) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <OfflineBanner />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="post-detail"
          options={{ headerShown: true, title: 'Publicação' }}
        />
      </Stack>
    </View>
  );
}
