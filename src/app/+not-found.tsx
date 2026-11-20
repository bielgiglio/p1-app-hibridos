import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTema } from '../context/ThemeContext';

export default function NotFoundScreen() {
  const { tema } = useTema();

  return (
    <View style={[styles.container, { backgroundColor: tema.background }]}>
      <Ionicons name="alert-circle-outline" size={56} color={tema.textSecondary} />
      <Text style={[styles.title, { color: tema.textPrimary }]}>Página não encontrada</Text>
      <Text style={[styles.subtitle, { color: tema.textSecondary }]}>
        A ligação que tentaste abrir não existe ou foi removida.
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: tema.primary }]}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.buttonText}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
