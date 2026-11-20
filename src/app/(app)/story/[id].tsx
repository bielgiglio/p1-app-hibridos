import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STORIES } from '../../../data/mockData';

const STORY_IMAGES = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900',
  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=900',
];

export default function StoryViewerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [resposta, setResposta] = useState('');
  const [gostou, setGostou] = useState(false);

  const storyIndex = STORIES.findIndex((s) => String(s.id) === String(id));
  const storyAtual = storyIndex >= 0 ? STORIES[storyIndex] : STORIES[0];
  const imagemFundo = STORY_IMAGES[(storyIndex >= 0 ? storyIndex : 0) % STORY_IMAGES.length];

  const handleEnviarResposta = () => {
    if (!resposta.trim()) return;
    Alert.alert('Mensagem enviada', `Enviaste "${resposta.trim()}" para ${storyAtual.user}.`);
    setResposta('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: imagemFundo }} style={styles.backgroundImage} />
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Barra de progresso decorativa */}
        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>

        {/* Cabeçalho do Story */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={{ uri: storyAtual.avatar }} style={styles.avatar} />
            <Text style={styles.username}>{storyAtual.user}</Text>
            <Text style={styles.time}>2 h</Text>
          </View>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />

        {/* Rodapé para responder ao Story */}
        <View style={styles.footer}>
          <TextInput
            placeholder={`Enviar mensagem para ${storyAtual.user}...`}
            placeholderTextColor="#CCCCCC"
            value={resposta}
            onChangeText={setResposta}
            style={styles.replyInput}
          />
          <TouchableOpacity onPress={() => setGostou((prev) => !prev)} style={styles.iconBtn}>
            <Ionicons
              name={gostou ? 'heart' : 'heart-outline'}
              size={26}
              color={gostou ? '#E1306C' : '#FFFFFF'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEnviarResposta} style={styles.iconBtn}>
            <Ionicons name="paper-plane-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  progressBarBg: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressBarFill: {
    width: '65%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  username: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  time: {
    color: '#DDDDDD',
    fontSize: 12,
  },
  closeBtn: {
    padding: 4,
  },
  spacer: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 8,
  },
  replyInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    borderRadius: 22,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 14,
  },
  iconBtn: {
    padding: 4,
  },
});
