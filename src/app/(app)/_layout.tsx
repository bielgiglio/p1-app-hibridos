import { Redirect, Stack } from 'expo-router';
import { View } from 'react-native';
import OfflineBanner from '../../components/OfflineBanner';
import { useAuth } from '../../context/AuthContext';
import { useTema } from '../../context/ThemeContext';

export default function AppLayout() {
  const { usuario, pronto } = useAuth();
  const { tema } = useTema();

  if (!pronto) return null;

  if (!usuario) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: tema.background }}>
      <OfflineBanner />
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: tema.background },
          headerTintColor: tema.textPrimary,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="post-detail"
          options={{ headerShown: true, title: 'Publicação' }}
        />
        <Stack.Screen
          name="post/[id]"
          options={{ headerShown: true, title: 'Detalhes do Post' }}
        />
        <Stack.Screen
          name="nova-publicacao"
          options={{
            headerShown: true,
            title: 'Nova Publicação',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="editar-perfil"
          options={{ headerShown: true, title: 'Editar Perfil' }}
        />
        <Stack.Screen
          name="configuracoes"
          options={{ headerShown: true, title: 'Configurações' }}
        />


      </Stack>
    </View>
  );
}
