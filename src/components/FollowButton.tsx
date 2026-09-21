import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function FollowButton() {
  const [following, setFollowing] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.button, following && styles.buttonFollowing]}
      onPress={() => setFollowing(!following)}
    >
      <Text style={[styles.text, following && styles.textFollowing]}>
        {following ? 'A seguir' : 'Seguir'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3797EF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonFollowing: {
    backgroundColor: '#EFEFEF',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  textFollowing: {
    color: '#000000',
  },
});