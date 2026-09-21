import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Post } from '../data/mockData';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
      setLiked(false);
    } else {
      setLikeCount(prev => prev + 1);
      setLiked(true);
    }
  };

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
        <Text style={styles.postUser}>{post.user}</Text>
      </View>

      <Image source={{ uri: post.postImage }} style={styles.postImage} />

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike} style={{ marginRight: 14 }}>
          <Feather
            name="heart"
            size={22}
            color={liked ? '#E1306C' : '#000000'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 14 }}>
          <Feather name="message-circle" size={22} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="send" size={22} color="#000000" />
        </TouchableOpacity>
      </View>

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
  },
  postImage: {
    width: '100%',
    height: 380,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  postDetails: {
    paddingHorizontal: 12,
  },
  likes: {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 4,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
  },
  time: {
    fontSize: 10,
    color: '#8E8E8E',
    marginTop: 4,
  },
});