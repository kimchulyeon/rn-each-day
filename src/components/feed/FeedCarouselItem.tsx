import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

export default function FeedCarouselItem({
  item,
  index,
}: {
  item: any;
  index: number;
}) {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: item.url}}
        style={{width: '100%', resizeMode: 'cover', height: '100%'}}
      />
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
});
