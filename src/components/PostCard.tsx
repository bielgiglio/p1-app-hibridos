import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTema } from '../context/ThemeContext';
import { FeedPost } from '../types/api';

interface PostCardProps {
  post: FeedPost;
}

export default function PostCard({ post }: PostCardProps) {
  const { tema } = useTema();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const abrirDetalhe = () => {
    router.push(`/post/${post.id}` as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: tema.background, borderBottomColor: tema.border }]}>
      <TouchableOpacity style={styles.header} onPress={abrirDetalhe} activeOpacity={0.7}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <Text style={[styles.username, { color: tema.textPrimary }]}>{post.user}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={abrirDetalhe} activeOpacity={0.9}>
        <Image source={{ uri: post.postImage }} style={styles.postImage} />
      </TouchableOpacity>

      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={toggleLike} style={styles.iconButton}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={24}
              color={liked ? tema.like : tema.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={abrirDetalhe} style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={22} color={tema.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="paper-plane-outline" size={22} color={tema.textPrimary} />
          </TouchableOpacity>
        </View>
        <Ionicons name="bookmark-outline" size={22} color={tema.textPrimary} />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.likes, { color: tema.textPrimary }]}>{likesCount} gostos</Text>
        <Text style={[styles.caption, { color: tema.textPrimary }]} numberOfLines={3}>
          <Text style={styles.username}>{post.user} </Text>
          {post.caption}
        </Text>
        <Text style={[styles.time, { color: tema.textSecondary }]}>{post.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderBottomWidth: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: '600',
    fontSize: 13,
  },
  postImage: {
    width: '100%',
    height: 360,
    backgroundColor: '#1E1E1E',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 14,
  },
  footer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  likes: {
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 4,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
  },
  time: {
    fontSize: 11,
    marginTop: 4,
  },
});
