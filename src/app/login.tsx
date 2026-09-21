import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '../constants/theme';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Instagram</Text>

      <TextInput
        placeholder="Telefone, nome de utilizador ou email"
        placeholderTextColor={COLORS.textSecondary}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Palavra-passe"
        placeholderTextColor={COLORS.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sessão</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotWrapper}>
        <Text style={styles.forgotText}>Esqueceu-se dos dados de início de sessão?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 44,
    color: COLORS.textPrimary,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 14,
    marginBottom: 12,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  loginButton: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: COLORS.background,
    fontWeight: '600',
    fontSize: 14,
  },
  forgotWrapper: {
    marginTop: 20,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '500',
  },
});