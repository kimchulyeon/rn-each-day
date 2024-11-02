import React from 'react';
import {Gray} from '@/constants';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

export default function PlaceholderImage({withText}: {withText?: string}) {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.placeholderImage} source={require('@/assets/eachdaylogo.webp')} />
      {withText && <Text style={styles.placeholderText}>{withText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('window').height / 2.3,
    width: '100%',
    position: 'relative',
  },
  placeholderImage: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: Gray.LIGHT,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Gray.DEFAULT,
    textAlign: 'center',
    marginTop: 20,
  },
});
