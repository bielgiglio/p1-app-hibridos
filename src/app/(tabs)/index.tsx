import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { STORIES, POSTS } from '../../data/mockData';

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={{ marginRight: 16 }}>
            <Feather name="heart" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="message-circle" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
          {STORIES.map(item => (
            <View key={item.id} style={styles.storyWrapper}>
              <View style={styles.storyBorder}>
                <Image source={{ uri: item.image }} style={styles.storyImage} />
              </View>
              <Text style={styles.storyUser} numberOfLines={1}>{item.user}</Text>
            </View>
          ))}
        </ScrollView>

        {POSTS.map(post => (
          <View key={post.id} style={styles.post}>
            <View style={styles.postHeader}>
              <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
              <Text style={styles.postUser}>{post.user}</Text>
            </View>

            <Image source={{ uri: post.postImage }} style={styles.postImage} />

            <View style={styles.actions}>
              <Feather name="heart" size={22} color="#000000" style={{ marginRight: 14 }} />
              <Feather name="message-circle" size={22} color="#000000" style={{ marginRight: 14 }} />
              <Feather name="send" size={22} color="#000000" />
            </View>

            <View style={styles.postDetails}>
              <Text style={styles.likes}>{post.likes} gostos</Text>
              <Text style={styles.caption}>
                <Text style={styles.bold}>{post.user}</Text> {post.caption}
              </Text>
              <Text style={styles.time}>{post.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 45,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  storiesContainer: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  storyWrapper: {
    alignItems: 'center',
    width: 76,
  },
  storyBorder: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#E1306C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  storyUser: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
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