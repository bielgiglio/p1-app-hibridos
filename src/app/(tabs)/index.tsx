import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { STORIES, POSTS } from '../../data/mockData';
import StoryBar from '../../components/StoryBar';
import PostCard from '../../components/PostCard';

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
        <StoryBar stories={STORIES} />
        {POSTS.map(post => (
          <PostCard key={post.id} post={post} />
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
});