import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

export default function SplashView() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/eachdaylogo.webp')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('screen').width * 0.8,
    resizeMode: 'contain',
  },
});
