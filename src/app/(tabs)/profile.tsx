import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { POSTS } from '../../data/mockData';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width / 3;

const PROFILE_PHOTOS = [
  POSTS[0].postImage,
  POSTS[1].postImage,
  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
  'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600',
];

const HIGHLIGHTS = [
  { id: '1', title: 'Viagens', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200' },
  { id: '2', title: 'Projetos', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200' },
  { id: '3', title: 'Café', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200' },
  { id: '4', title: 'Setup', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=200' },
];

export default function ProfileScreen() {
  const handleOpenDetail = (imageUrl: string) => {
    router.push({
      pathname: '/post-detail' as any,
      params: { image: imageUrl, user: 'meu_usuario' },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.username}>meu_usuario</Text>
        <Feather name="menu" size={24} color="#000000" />
      </View>

      <View style={styles.infoContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' }}
          style={styles.avatar}
        />
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>412</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>320</Text>
            <Text style={styles.statLabel}>A seguir</Text>
          </View>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.fullName}>Gabriel Martins</Text>
        <Text style={styles.bioText}>Desenvolvimento de interfaces mobile com React Native e Expo.</Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar perfil</Text>
      </TouchableOpacity>

      {/* Secção de Destaques */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightsContainer}>
        {HIGHLIGHTS.map((item) => (
          <View key={item.id} style={styles.highlightWrapper}>
            <View style={styles.highlightCircle}>
              <Image source={{ uri: item.image }} style={styles.highlightImage} />
            </View>
            <Text style={styles.highlightTitle}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.tabDivider} />

      <FlatList
        data={PROFILE_PHOTOS}
        keyExtractor={(_, index) => String(index)}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridItem}
            activeOpacity={0.8}
            onPress={() => handleOpenDetail(item)}
          >
            <Image source={{ uri: item }} style={styles.gridImage} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 45,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  bioContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#000000',
  },
  bioText: {
    fontSize: 13,
    color: '#333333',
    marginTop: 2,
    lineHeight: 18,
  },
  editButton: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: '#EFEFEF',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  highlightsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  highlightWrapper: {
    alignItems: 'center',
    marginRight: 16,
  },
  highlightCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  highlightTitle: {
    fontSize: 11,
    color: '#262626',
    marginTop: 4,
  },
  tabDivider: {
    height: 1,
    backgroundColor: '#DBDBDB',
  },
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    padding: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
});