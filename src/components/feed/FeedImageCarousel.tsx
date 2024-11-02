import React from 'react';
import {Gray} from '@/constants';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import FeedCarouselItem from './FeedCarouselItem';

export default function ImageCarousel({imageData}: {imageData: any}) {
  return (
    <View style={styles.imageContainer}>
      <FlatList
        data={imageData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <FeedCarouselItem item={item} index={index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('window').height / 2.3,
    width: '100%',
    backgroundColor: Gray.LIGHT,
  },
});
