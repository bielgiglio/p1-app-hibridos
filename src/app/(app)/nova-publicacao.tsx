import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
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
import { useTema } from '../../context/ThemeContext';
import { api } from '../../services/api';

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
];

export default function NovaPublicacaoScreen() {
  const { tema } = useTema();
  const [titulo, setTitulo] = useState('');
  const [legenda, setLegenda] = useState('');
  const [imagemUrl, setImagemUrl] = useState(PRESET_IMAGES[0]);
  const [enviando, setEnviando] = useState(false);

  const handlePublicar = async () => {
    if (!titulo.trim() || !legenda.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha o título e a legenda da publicação.');
      return;
    }

    setEnviando(true);
    try {
      const resposta = await api.criarPost({
        title: titulo.trim(),
        body: legenda.trim(),
        userId: 1,
      });

      Alert.alert(
        'Publicação enviada',
        `Post criado com sucesso na API (ID #${resposta.id}).`,
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error: any) {
      Alert.alert('Erro ao publicar', error?.message || 'Não foi possível enviar o post.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: tema.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: imagemUrl }} style={styles.preview} />

        <Text style={[styles.label, { color: tema.textSecondary }]}>
          Escolhe uma pré-visualização rápida:
        </Text>
        <View style={styles.presetsRow}>
          {PRESET_IMAGES.map((url, idx) => (
            <TouchableOpacity
              key={url}
              onPress={() => setImagemUrl(url)}
              style={[
                styles.presetBtn,
                {
                  borderColor: imagemUrl === url ? tema.primary : tema.border,
                  borderWidth: imagemUrl === url ? 2 : 1,
                },
              ]}
            >
              <Image source={{ uri: url }} style={styles.presetThumb} />
              <Text style={[styles.presetLabel, { color: tema.textPrimary }]}>Foto {idx + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: tema.textPrimary }]}>Título</Text>
        <TextInput
          placeholder="Ex: A programar em React Native"
          placeholderTextColor={tema.textSecondary}
          value={titulo}
          onChangeText={setTitulo}
          style={[
            styles.input,
            {
              backgroundColor: tema.inputBackground,
              borderColor: tema.border,
              color: tema.textPrimary,
            },
          ]}
        />

        <Text style={[styles.label, { color: tema.textPrimary }]}>Legenda</Text>
        <TextInput
          placeholder="Escreve uma legenda para a tua foto..."
          placeholderTextColor={tema.textSecondary}
          value={legenda}
          onChangeText={setLegenda}
          multiline
          numberOfLines={4}
          style={[
            styles.textArea,
            {
              backgroundColor: tema.inputBackground,
              borderColor: tema.border,
              color: tema.textPrimary,
            },
          ]}
        />

        <TouchableOpacity
          style={[styles.submitBtn, { backgroundColor: tema.primary, opacity: enviando ? 0.7 : 1 }]}
          onPress={handlePublicar}
          disabled={enviando}
        >
          {enviando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={20} color="#FFFFFF" />
              <Text style={styles.submitText}>Partilhar Publicação</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: spacing.md },
  preview: {
    width: '100%',
    height: 220,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    backgroundColor: '#1E1E1E',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  presetsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.md,
  },
  presetBtn: {
    flex: 1,
    alignItems: 'center',
    padding: 6,
    borderRadius: radius.sm,
  },
  presetThumb: {
    width: '100%',
    height: 48,
    borderRadius: 4,
    marginBottom: 4,
  },
  presetLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    marginBottom: spacing.md,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderRadius: radius.sm,
    padding: 12,
    marginBottom: spacing.lg,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  submitBtn: {
    height: 48,
    borderRadius: radius.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  submitText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});
