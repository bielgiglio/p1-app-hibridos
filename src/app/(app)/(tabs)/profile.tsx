import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../context/AuthContext';
import { useTema } from '../../../context/ThemeContext';
import { POSTS } from '../../../data/mockData';

const GRID_SIZE = Dimensions.get('window').width / 3;

export default function ProfileScreen() {
  const { usuario } = useAuth();
  const { tema } = useTema();

  const avatarUri =
    usuario?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300';

  const renderHeader = () => (
    <View style={[styles.headerContainer, { backgroundColor: tema.background }]}>
      {/* Barra superior com username e botão de Configurações */}
      <View style={styles.topBar}>
        <Text style={[styles.headerUsername, { color: tema.textPrimary }]}>
          {usuario?.username || 'meu_usuario'}
        </Text>
        <View style={styles.topIcons}>
          <TouchableOpacity
            onPress={() => router.push('/nova-publicacao' as any)}
            style={styles.iconBtn}
          >
            <Ionicons name="add-circle-outline" size={26} color={tema.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/configuracoes' as any)}
            style={styles.iconBtn}
          >
            <Ionicons name="settings-outline" size={24} color={tema.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Avatar + Estatísticas */}
      <View style={styles.statsRow}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        <View style={styles.statsGroup}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: tema.textPrimary }]}>{POSTS.length}</Text>
            <Text style={[styles.statLabel, { color: tema.textSecondary }]}>Publicações</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: tema.textPrimary }]}>428</Text>
            <Text style={[styles.statLabel, { color: tema.textSecondary }]}>Seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: tema.textPrimary }]}>315</Text>
            <Text style={[styles.statLabel, { color: tema.textSecondary }]}>A seguir</Text>
          </View>
        </View>
      </View>

      {/* Nome e Bio persistidos */}
      <View style={styles.bioSection}>
        <Text style={[styles.name, { color: tema.textPrimary }]}>
          {usuario?.name || 'Gabriel Martins'}
        </Text>
        <Text style={[styles.bio, { color: tema.textPrimary }]}>
          {usuario?.bio || 'Desenvolvimento de interfaces mobile com React Native e Expo.'}
        </Text>
      </View>

      {/* Botões de ação */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: tema.secondaryButton }]}
          onPress={() => router.push('/editar-perfil' as any)}
        >
          <Text style={[styles.actionBtnText, { color: tema.textPrimary }]}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: tema.secondaryButton }]}
          onPress={() => router.push('/configuracoes' as any)}
        >
          <Text style={[styles.actionBtnText, { color: tema.textPrimary }]}>Configurações</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.gridDivider, { borderTopColor: tema.border }]}>
        <Ionicons name="grid-outline" size={22} color={tema.textPrimary} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: tema.background }]} edges={['top']}>
      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => router.push(`/post/${index + 1}` as any)}
            activeOpacity={0.85}
          >
            <Image
              source={{ uri: item.postImage }}
              style={[styles.gridImage, { borderColor: tema.background }]}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  headerContainer: { paddingTop: 6 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerUsername: { fontSize: 20, fontWeight: 'bold' },
  topIcons: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginLeft: 16 },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  statsGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 17, fontWeight: 'bold' },
  statLabel: { fontSize: 12, marginTop: 2 },
  bioSection: { paddingHorizontal: 16, marginBottom: 14 },
  name: { fontWeight: 'bold', fontSize: 14, marginBottom: 2 },
  bio: { fontSize: 13, lineHeight: 18 },
  actionsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  actionBtn: {
    flex: 1,
    height: 34,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: { fontWeight: '600', fontSize: 13 },
  gridDivider: {
    borderTopWidth: 0.5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  gridImage: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    borderWidth: 0.5,
  },
});
