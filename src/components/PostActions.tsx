import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface PostActionsProps {
  initialLiked?: boolean;
  onToggleLike?: (liked: boolean) => void;
}

export default function PostActions({ initialLiked = false, onToggleLike }: PostActionsProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    const nextState = !liked;
    setLiked(nextState);
    if (onToggleLike) onToggleLike(nextState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftActions}>
        <TouchableOpacity onPress={handleLike} style={styles.actionBtn}>
          <Feather
            name="heart"
            size={22}
            color={liked ? COLORS.like : COLORS.textPrimary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Feather name="message-circle" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Feather name="send" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setSaved(!saved)}>
        <Feather
          name="bookmark"
          size={22}
          color={saved ? COLORS.textPrimary : COLORS.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    marginRight: 14,
  },
});