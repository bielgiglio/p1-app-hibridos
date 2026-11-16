import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, radius, spacing } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

export default function CadastroScreen() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { entrar } = useAuth();

  const handleCadastrar = () => {
    if (!username.trim() || !senha.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha o nome de utilizador e a palavra-passe.');
      return;
    }

    entrar(username);
    router.replace('/(tabs)' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.logo}>Instagram</Text>
        <Text style={styles.subtitle}>
          Regista-te para veres fotos e vídeos dos teus amigos.
        </Text>

        <TextInput
          placeholder="Nome completo"
          placeholderTextColor={COLORS.textSecondary}
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
          style={styles.input}
        />

        <TextInput
          placeholder="Nome de utilizador"
          placeholderTextColor={COLORS.textSecondary}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor={COLORS.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Palavra-passe"
          placeholderTextColor={COLORS.textSecondary}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.registerButton} onPress={handleCadastrar}>
          <Text style={styles.registerButtonText}>Registar</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Já tens uma conta? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.loginLink}>Inicia sessão</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    marginBottom: 12,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  registerButton: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  registerButtonText: {
    color: COLORS.background,
    fontWeight: '600',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  loginLink: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
