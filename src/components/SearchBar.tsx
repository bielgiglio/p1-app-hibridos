import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Pesquisar',
  onClear,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Feather name="search" size={18} color="#8E8E8E" style={styles.searchIcon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#8E8E8E"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear || (() => onChangeText(''))}>
          <Feather name="x-circle" size={16} color="#8E8E8E" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    marginHorizontal: 12,
    marginBottom: 10,
    paddingHorizontal: 12,
    height: 38,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
});