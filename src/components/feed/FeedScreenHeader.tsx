import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function FeedScreenHeader() {
  return (
    <Image
      source={require('@/assets/eachdaytextlogo.webp')}
      style={styles.logo}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    marginLeft: 10,
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
});
