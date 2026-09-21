import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NOTIFICATIONS } from '../../data/mockData';

export default function ActivityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Atividade</Text>

      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.avatarMock}>
              <Feather name="user" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.itemText}>
              <Text style={styles.username}>{item.user} </Text>
              {item.action} <Text style={styles.timeText}>{item.time}</Text>
            </Text>
          </View>
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
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarMock: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: '#262626',
  },
  username: {
    fontWeight: 'bold',
  },
  timeText: {
    color: '#8E8E8E',
  },
});