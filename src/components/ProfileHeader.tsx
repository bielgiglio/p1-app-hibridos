import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface ProfileHeaderProps {
  username: string;
  fullName: string;
  bio: string;
  avatarUrl: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

export default function ProfileHeader({
  fullName,
  bio,
  avatarUrl,
  postsCount,
  followersCount,
  followingCount,
}: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{postsCount}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{followersCount}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{followingCount}</Text>
            <Text style={styles.statLabel}>A seguir</Text>
          </View>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.fullName}>{fullName}</Text>
        <Text style={styles.bioText}>{bio}</Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 4,
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
});