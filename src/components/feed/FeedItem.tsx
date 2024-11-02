import React from 'react';
import {StyleSheet, View} from 'react-native';
import FeedImageCarousel from './FeedImageCarousel';
import FeedProfile from './FeedProfile';
import FeedFooter from './FeedFooter';

function FeedItem() {
  const imageData = [
    {id: '1', url: 'https://picsum.photos/200'},
    {id: '2', url: 'https://picsum.photos/300'},
    {id: '3', url: 'https://picsum.photos/220'},
  ];

  return (
    <View style={styles.container}>
      <FeedProfile />
      <FeedImageCarousel imageData={imageData} />
      <FeedFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    marginTop: 10,
  },
});

export default FeedItem;
