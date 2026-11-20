import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useOnline } from '../hooks/useOnline';

export default function OfflineBanner() {
  const online = useOnline();

  if (online) {
    return null;
  }

  return (
    <View style={styles.banner}>
      <Ionicons name="wifi-outline" size={16} color="#FFFFFF" />
      <Text style={styles.text}>Sem ligação à internet — modo offline ativo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#ED4956',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 6,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
