import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Post } from '../data/mockData';
import { COLORS } from '../constants/theme';
import PostActions from './PostActions';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleToggleLike = (liked: boolean) => {
    setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
  };

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
        <Text style={styles.postUser}>{post.user}</Text>
      </View>

      <Image source={{ uri: post.postImage }} style={styles.postImage} />

      <PostActions onToggleLike={handleToggleLike} />

      <View style={styles.postDetails}>
        <Text style={styles.likes}>{likeCount} gostos</Text>
        <Text style={styles.caption}>
          <Text style={styles.bold}>{post.user}</Text> {post.caption}
        </Text>
        <Text style={styles.time}>{post.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  postUser: {
    fontWeight: 'bold',
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  postImage: {
    width: '100%',
    height: 380,
  },
  postDetails: {
    paddingHorizontal: 12,
  },
  likes: {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 4,
    color: COLORS.textPrimary,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textPrimary,
  },
  bold: {
    fontWeight: 'bold',
  },
  time: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});