import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Story } from '../data/mockData';

interface StoryBarProps {
  stories: Story[];
}

export default function StoryBar({ stories }: StoryBarProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {stories.map((item) => (
        <View key={item.id} style={styles.wrapper}>
          <View style={styles.border}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
          <Text style={styles.username} numberOfLines={1}>{item.user}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  wrapper: {
    alignItems: 'center',
    width: 76,
  },
  border: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#E1306C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  username: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
});