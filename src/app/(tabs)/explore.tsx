import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width / 3;

const EXPLORE_IMAGES = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600',
  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600',
  'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600',
  'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600',
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600',
];

export default function ExploreScreen() {
  const [search, setSearch] = useState('');

  const handleOpenDetail = (imageUrl: string) => {
    router.push({
      pathname: '/post-detail' as any,
      params: { image: imageUrl, user: 'explorar' },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#8E8E8E" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Pesquisar"
          placeholderTextColor="#8E8E8E"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={EXPLORE_IMAGES}
        keyExtractor={(_, index) => String(index)}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridItem}
            activeOpacity={0.8}
            onPress={() => handleOpenDetail(item)}
          >
            <Image source={{ uri: item }} style={styles.image} />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    marginHorizontal: 12,
    marginBottom: 10,
    paddingHorizontal: 12,
    height: 38,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    padding: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});