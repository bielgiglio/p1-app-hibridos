import { router } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTema } from '../context/ThemeContext';

interface Story {
  id: string;
  user: string;
  avatar: string;
}

interface StoryBarProps {
  stories: Story[];
}

export default function StoryBar({ stories }: StoryBarProps) {
  const { tema } = useTema();

  return (
    <View style={[styles.container, { backgroundColor: tema.background, borderBottomColor: tema.border }]}>
      <FlatList
        data={stories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.storyItem}
            onPress={() => router.push(`/story/${item.id}` as any)}
            activeOpacity={0.75}
          >
            <View style={[styles.ring, { borderColor: tema.like }]}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
            </View>
            <Text style={[styles.username, { color: tema.textPrimary }]} numberOfLines={1}>
              {item.user}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 14,
    width: 66,
  },
  ring: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  username: {
    fontSize: 11,
    textAlign: 'center',
  },
});
