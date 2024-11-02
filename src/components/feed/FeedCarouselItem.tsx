import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

export default function FeedCarouselItem({item}: {item: string}) {
  return (
    <View style={styles.container}>
      <Image source={{uri: item}} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  image: {width: '100%', resizeMode: 'cover', height: '100%'},
});
