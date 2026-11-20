import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { radius, spacing } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { useTema } from '../../context/ThemeContext';

export default function EditarPerfilScreen() {
  const { usuario, atualizarPerfil } = useAuth();
  const { tema } = useTema();

  const [name, setName] = useState(usuario?.name || '');
  const [username, setUsername] = useState(usuario?.username || '');
  const [bio, setBio] = useState(usuario?.bio || '');
  const [avatar, setAvatar] = useState(
    usuario?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'
  );

  const handleGuardar = async () => {
    if (!username.trim()) {
      Alert.alert('Campo obrigatório', 'O nome de utilizador não pode ficar vazio.');
      return;
    }

    await atualizarPerfil({
      name: name.trim(),
      username: username.trim(),
      bio: bio.trim(),
      avatar: avatar.trim(),
    });

    Alert.alert('Perfil atualizado', 'As alterações foram guardadas no armazenamento local.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: tema.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <Text style={[styles.avatarHint, { color: tema.primary }]}>Foto de perfil atual</Text>
        </View>

        <Text style={[styles.label, { color: tema.textSecondary }]}>Nome</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="O teu nome completo"
          placeholderTextColor={tema.textSecondary}
          style={[
            styles.input,
            {
              backgroundColor: tema.inputBackground,
              borderColor: tema.border,
              color: tema.textPrimary,
            },
          ]}
        />

        <Text style={[styles.label, { color: tema.textSecondary }]}>Nome de utilizador</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholder="nome_utilizador"
          placeholderTextColor={tema.textSecondary}
          style={[
            styles.input,
            {
              backgroundColor: tema.inputBackground,
              borderColor: tema.border,
              color: tema.textPrimary,
            },
          ]}
        />

        <Text style={[styles.label, { color: tema.textSecondary }]}>Biografia</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
          placeholder="Escreve algo sobre ti..."
          placeholderTextColor={tema.textSecondary}
          style={[
            styles.textArea,
            {
              backgroundColor: tema.inputBackground,
              borderColor: tema.border,
              color: tema.textPrimary,
            },
          ]}
        />

        <Text style={[styles.label, { color: tema.textSecondary }]}>URL do Avatar</Text>
        <TextInput
          value={avatar}
          onChangeText={setAvatar}
          autoCapitalize="none"
          placeholder="https://..."
          placeholderTextColor={tema.textSecondary}
          style={[
            styles.input,
            {
              backgroundColor: tema.inputBackground,
              borderColor: tema.border,
              color: tema.textPrimary,
            },
          ]}
        />

        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: tema.primary }]}
          onPress={handleGuardar}
        >
          <Text style={styles.saveBtnText}>Guardar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: spacing.md },
  avatarWrapper: { alignItems: 'center', marginVertical: spacing.md },
  avatar: { width: 88, height: 88, borderRadius: 44, marginBottom: 8 },
  avatarHint: { fontSize: 13, fontWeight: '600' },
  label: { fontSize: 12, fontWeight: '600', marginBottom: 6 },
  input: {
    height: 46,
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    marginBottom: spacing.md,
    fontSize: 14,
  },
  textArea: {
    height: 84,
    borderWidth: 1,
    borderRadius: radius.sm,
    padding: 12,
    marginBottom: spacing.md,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  saveBtn: {
    height: 48,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  saveBtnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
});
