import React from 'react';
import {StyleSheet, View} from 'react-native';
import FeedImageCarousel from './FeedImageCarousel';
import FeedProfile from './FeedProfile';
import FeedFooter from './FeedFooter';
import {Feed} from '@/hooks/useFirestore';

function FeedItem({feed}: {feed: Feed}) {
  return (
    <View style={styles.container}>
      <FeedProfile />
      <FeedImageCarousel imageDatas={feed.imageUrls} />
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
