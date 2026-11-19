import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostCard from '../../../components/PostCard';
import StoryBar from '../../../components/StoryBar';
import { useTema } from '../../../context/ThemeContext';
import { STORIES } from '../../../data/mockData';
import { useFetch } from '../../../hooks/useFetch';
import { api } from '../../../services/api';
import { FeedPost } from '../../../types/api';

export default function FeedScreen() {
  const { tema } = useTema();
  const [refreshing, setRefreshing] = useState(false);

  const {
    dados: posts,
    carregando,
    erro,
    usandoCache,
    recarregar,
  } = useFetch<FeedPost[]>(() => api.buscarPosts(), {
    cacheKey: 'feed_posts',
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await recarregar();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: tema.background }]} edges={['top']}>
      {/* Cabeçalho superior estilo Instagram */}
      <View style={[styles.topBar, { borderBottomColor: tema.border }]}>
        <Text style={[styles.logo, { color: tema.textPrimary }]}>Instagram</Text>
        <View style={styles.topIcons}>
          <TouchableOpacity
            onPress={() => router.push('/nova-publicacao' as any)}
            style={styles.topIconBtn}
          >
            <Ionicons name="add-circle-outline" size={26} color={tema.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topIconBtn}>
            <Ionicons name="paper-plane-outline" size={24} color={tema.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {usandoCache && (
        <View style={styles.cacheBanner}>
          <Text style={styles.cacheBannerText}>
            A mostrar publicações guardadas em cache (sem ligação atual)
          </Text>
        </View>
      )}

      {/* Estado 1: Carregamento inicial */}
      {carregando && !posts ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={tema.primary} />
          <Text style={[styles.stateText, { color: tema.textSecondary }]}>
            A carregar publicações...
          </Text>
        </View>
      ) : erro && !posts ? (
        /* Estado 2: Erro na requisição */
        <View style={styles.centerState}>
          <Ionicons name="cloud-offline-outline" size={48} color={tema.danger} />
          <Text style={[styles.errorTitle, { color: tema.textPrimary }]}>
            Não foi possível carregar o feed
          </Text>
          <Text style={[styles.stateText, { color: tema.textSecondary }]}>{erro}</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: tema.primary }]}
            onPress={() => recarregar()}
          >
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Estado 3 e 4: Lista vazia ou conteúdo carregado com FlatList + Pull-to-Refresh */
        <FlatList
          data={posts ?? []}
          keyExtractor={(item) => String(item.id)}
          ListHeaderComponent={<StoryBar stories={STORIES} />}
          renderItem={({ item }) => <PostCard post={item} />}
          ListEmptyComponent={
            <View style={styles.centerState}>
              <Text style={[styles.stateText, { color: tema.textSecondary }]}>
                Nenhuma publicação encontrada.
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={tema.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topIconBtn: {
    marginLeft: 16,
  },
  cacheBanner: {
    backgroundColor: '#F59E0B',
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  cacheBannerText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
  },
  centerState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 60,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  stateText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
