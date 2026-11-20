import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTema } from '../../../context/ThemeContext';
import { ACTIVITIES } from '../../../data/mockData';

export default function ActivityScreen() {
  const { tema } = useTema();
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({
    '2': false,
    '5': true,
  });

  const toggleFollow = (id: string) => {
    setFollowingMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: tema.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: tema.border }]}>
        <Text style={[styles.title, { color: tema.textPrimary }]}>Atividades</Text>
      </View>

      <FlatList
        data={ACTIVITIES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isFollowing = followingMap[item.id] ?? false;

          return (
            <View style={styles.row}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />

              <View style={styles.info}>
                <Text style={[styles.text, { color: tema.textPrimary }]}>
                  <Text style={styles.username}>{item.user} </Text>
                  {item.action}{' '}
                  <Text style={[styles.time, { color: tema.textSecondary }]}>{item.time}</Text>
                </Text>
              </View>

              {item.postThumb ? (
                <TouchableOpacity onPress={() => router.push(`/post/${item.postId || 1}` as any)}>
                  <Image source={{ uri: item.postThumb }} style={styles.thumb} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.followBtn,
                    {
                      backgroundColor: isFollowing ? tema.secondaryButton : tema.primary,
                    },
                  ]}
                  onPress={() => toggleFollow(item.id)}
                >
                  <Text
                    style={[
                      styles.followText,
                      { color: isFollowing ? tema.textPrimary : '#FFFFFF' },
                    ]}
                  >
                    {isFollowing ? 'A seguir' : 'Seguir'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  info: {
    flex: 1,
    paddingRight: 10,
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
  },
  username: {
    fontWeight: '700',
  },
  time: {
    fontSize: 12,
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 4,
  },
  followBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 6,
  },
  followText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
