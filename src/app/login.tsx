import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Instagram</Text>

      <TextInput
        placeholder="Telefone, nome de utilizador ou email"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Palavra-passe"
        placeholderTextColor="#888"
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 44,
    color: '#000000',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 6,
    paddingHorizontal: 14,
    marginBottom: 12,
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#3797EF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  forgotWrapper: {
    marginTop: 20,
  },
  forgotText: {
    color: '#3797EF',
    fontSize: 12,
    fontWeight: '500',
  },
});