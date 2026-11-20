import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
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

  const initialIndex = STORIES.findIndex((s) => String(s.id) === String(id));
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  const storyAtual = STORIES[currentIndex] || STORIES[0];
  const imagemFundo = STORY_IMAGES[currentIndex % STORY_IMAGES.length];

  const irAnterior = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setGostou(false);
    } else {
      router.back();
    }
  };

  const irProximo = () => {
    if (currentIndex < STORIES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setGostou(false);
    } else {
      router.back();
    }
  };

  const handleEnviarResposta = () => {
    if (!resposta.trim()) return;
    Alert.alert('Mensagem enviada', `Enviaste "${resposta.trim()}" para ${storyAtual.user}.`);
    setResposta('');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imagemFundo }} style={styles.backgroundImage} />
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Barras de progresso por story */}
        <View style={styles.progressRow}>
          {STORIES.map((s, idx) => (
            <View key={s.id} style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: idx <= currentIndex ? '100%' : '0%' },
                ]}
              />
            </View>
          ))}
        </View>

        {/* Cabeçalho do Story */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={{ uri: storyAtual.avatar }} style={styles.avatar} />
            <Text style={styles.username}>{storyAtual.user}</Text>
            <Text style={styles.time}>
              {currentIndex + 1}/{STORIES.length}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn} hitSlop={12}>
            <Ionicons name="close" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Áreas invisíveis esquerda/direita para voltar ou avançar o story */}
        <View style={styles.tapZones}>
          <Pressable style={styles.tapHalf} onPress={irAnterior} />
          <Pressable style={styles.tapHalf} onPress={irProximo} />
        </View>

        {/* Rodapé para responder ao Story */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={10}
        >
          <View style={styles.footer}>
            <TextInput
              placeholder={`Enviar mensagem para ${storyAtual.user}...`}
              placeholderTextColor="#DDDDDD"
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
    </View>
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
    backgroundColor: 'rgba(0,0,0,0.32)',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 14,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6,
    marginBottom: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  username: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  time: {
    color: '#E0E0E0',
    fontSize: 12,
  },
  closeBtn: {
    padding: 4,
  },
  tapZones: {
    flex: 1,
    flexDirection: 'row',
  },
  tapHalf: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  replyInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.75)',
    borderRadius: 22,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  iconBtn: {
    padding: 4,
  },
});
