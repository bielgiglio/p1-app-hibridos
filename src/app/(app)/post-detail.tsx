import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function PostDetailScreen() {
  const { image, user } = useLocalSearchParams<{ image: string; user: string }>();
  const [liked, setLiked] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userRow}>
          <View style={styles.avatarMock}>
            <Feather name="user" size={16} color="#FFFFFF" />
          </View>
          <Text style={styles.username}>{user || 'utilizador'}</Text>
        </View>
        <Feather name="more-horizontal" size={20} color="#000000" />
      </View>

      <Image
        source={{ uri: image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800' }}
        style={styles.image}
      />

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => setLiked(!liked)} style={{ marginRight: 14 }}>
          <Feather
            name="heart"
            size={24}
            color={liked ? '#E1306C' : '#000000'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 14 }}>
          <Feather name="message-circle" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="send" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.likes}>{liked ? '241 gostos' : '240 gostos'}</Text>
        <Text style={styles.caption}>
          <Text style={styles.bold}>{user || 'utilizador'}</Text> Detalhe da publicação selecionada na grelha do Instagram clone.
        </Text>
        <Text style={styles.time}>Há 1 dia</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EFEFEF',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarMock: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  image: {
    width: '100%',
    height: 380,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  content: {
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