import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { radius, spacing } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { useTema } from '../../context/ThemeContext';
import { cache } from '../../services/cache';

export default function ConfiguracoesScreen() {
  const { tema, isDark, setModo } = useTema();
  const { usuario, sair } = useAuth();

  const toggleDarkMode = (valor: boolean) => {
    setModo(valor ? 'escuro' : 'claro');
  };

  const handleLimparCache = async () => {
    await cache.clear('feed_posts');
    Alert.alert('Cache limpo', 'Os dados em cache do feed foram removidos.');
  };

  const handleLogout = () => {
    Alert.alert('Terminar sessão', 'Tens a certeza de que queres sair da tua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await sair();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.sectionTitle, { color: tema.textSecondary }]}>CONTA</Text>
      <View style={[styles.card, { backgroundColor: tema.surface, borderColor: tema.border }]}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="person-circle-outline" size={24} color={tema.textPrimary} />
            <View>
              <Text style={[styles.rowTitle, { color: tema.textPrimary }]}>
                {usuario?.name || 'Utilizador'}
              </Text>
              <Text style={[styles.rowSubtitle, { color: tema.textSecondary }]}>
                @{usuario?.username || 'meu_usuario'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: tema.textSecondary }]}>APARÊNCIA</Text>
      <View style={[styles.card, { backgroundColor: tema.surface, borderColor: tema.border }]}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons
              name={isDark ? 'moon' : 'sunny-outline'}
              size={22}
              color={tema.textPrimary}
            />
            <Text style={[styles.rowTitle, { color: tema.textPrimary }]}>Modo Escuro</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#767577', true: tema.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: tema.textSecondary }]}>ARMAZENAMENTO</Text>
      <View style={[styles.card, { backgroundColor: tema.surface, borderColor: tema.border }]}>
        <TouchableOpacity style={styles.row} onPress={handleLimparCache}>
          <View style={styles.rowLeft}>
            <Ionicons name="trash-outline" size={22} color={tema.textPrimary} />
            <Text style={[styles.rowTitle, { color: tema.textPrimary }]}>
              Limpar cache do Feed
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={tema.textSecondary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.logoutBtn, { borderColor: tema.danger }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color={tema.danger} />
        <Text style={[styles.logoutText, { color: tema.danger }]}>Terminar sessão</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.md },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: spacing.xs,
    marginTop: spacing.md,
    letterSpacing: 0.5,
  },
  card: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  rowSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  logoutBtn: {
    marginTop: spacing.xl,
    height: 48,
    borderWidth: 1,
    borderRadius: radius.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
