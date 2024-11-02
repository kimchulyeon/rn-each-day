import {Salgu} from '@/constants';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AddFeedButton() {
  return (
    <Pressable style={styles.addButton}>
      <Icon name="add" size={20} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Salgu.Secondary,
    padding: 10,
    borderRadius: 50,
  },
});
