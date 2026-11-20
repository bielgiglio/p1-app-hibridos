import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
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
import { useAuth } from '../../../context/AuthContext';
import { useTema } from '../../../context/ThemeContext';
import { useFetch } from '../../../hooks/useFetch';
import { api } from '../../../services/api';
import { FeedPost } from '../../../types/api';

interface Comentario {
  id: string;
  autor: string;
  texto: string;
}

export default function PostDynamicDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tema } = useTema();
  const { usuario } = useAuth();

  const postId = Number(id) || 1;

  const {
    dados: post,
    carregando,
    erro,
    recarregar,
  } = useFetch<FeedPost>(() => api.buscarPostPorId(postId), {
    cacheKey: `post_${postId}`,
  });

  const [novoComentario, setNovoComentario] = useState('');
  const [comentarios, setComentarios] = useState<Comentario[]>([
    { id: '1', autor: 'ana.silva', texto: 'Excelente publicação!' },
    { id: '2', autor: 'carlos_dev', texto: 'Muito bom mesmo.' },
  ]);

  const handleEnviarComentario = () => {
    if (!novoComentario.trim()) return;
    setComentarios((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        autor: usuario?.username || 'meu_usuario',
        texto: novoComentario.trim(),
      },
    ]);
    setNovoComentario('');
  };

  if (carregando && !post) {
    return (
      <View style={[styles.center, { backgroundColor: tema.background }]}>
        <ActivityIndicator size="large" color={tema.primary} />
      </View>
    );
  }

  if (erro && !post) {
    return (
      <View style={[styles.center, { backgroundColor: tema.background }]}>
        <Text style={[styles.errorText, { color: tema.danger }]}>{erro}</Text>
        <TouchableOpacity
          style={[styles.retryBtn, { backgroundColor: tema.primary }]}
          onPress={() => recarregar()}
        >
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!post) return null;

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: tema.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <View>
            <Text style={[styles.username, { color: tema.textPrimary }]}>{post.user}</Text>
            <Text style={[styles.time, { color: tema.textSecondary }]}>Post #{post.id}</Text>
          </View>
        </View>

        <Image source={{ uri: post.postImage }} style={styles.postImage} />

        <View style={styles.body}>
          <Text style={[styles.likes, { color: tema.textPrimary }]}>{post.likes} gostos</Text>
          <Text style={[styles.caption, { color: tema.textPrimary }]}>
            <Text style={styles.username}>{post.user} </Text>
            {post.caption}
          </Text>
          <Text style={[styles.time, { color: tema.textSecondary }]}>{post.time}</Text>
        </View>

        <View style={[styles.commentsSection, { borderTopColor: tema.border }]}>
          <Text style={[styles.commentsTitle, { color: tema.textPrimary }]}>
            Comentários ({comentarios.length})
          </Text>
          {comentarios.map((c) => (
            <View key={c.id} style={styles.commentRow}>
              <Text style={[styles.commentText, { color: tema.textPrimary }]}>
                <Text style={styles.username}>{c.autor} </Text>
                {c.texto}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.inputBar, { borderTopColor: tema.border, backgroundColor: tema.surface }]}>
        <TextInput
          placeholder="Adiciona um comentário..."
          placeholderTextColor={tema.textSecondary}
          value={novoComentario}
          onChangeText={setNovoComentario}
          style={[styles.input, { color: tema.textPrimary, backgroundColor: tema.inputBackground }]}
        />
        <TouchableOpacity onPress={handleEnviarComentario} style={styles.sendBtn}>
          <Ionicons name="send" size={20} color={tema.primary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText: { fontSize: 14, marginBottom: 12 },
  retryBtn: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 8 },
  retryText: { color: '#FFFFFF', fontWeight: '600' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  username: { fontWeight: '600', fontSize: 13 },
  postImage: { width: '100%', height: 380, backgroundColor: '#1E1E1E' },
  body: { padding: 12 },
  likes: { fontWeight: '600', fontSize: 13, marginBottom: 6 },
  caption: { fontSize: 14, lineHeight: 20, marginBottom: 6 },
  time: { fontSize: 11 },
  commentsSection: { padding: 12, borderTopWidth: 0.5 },
  commentsTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 10 },
  commentRow: { marginBottom: 8 },
  commentText: { fontSize: 13, lineHeight: 18 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 0.5,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 14,
    fontSize: 14,
  },
  sendBtn: { marginLeft: 10, padding: 6 },
});
