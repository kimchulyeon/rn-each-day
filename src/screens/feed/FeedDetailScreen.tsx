import {Feed} from '@/hooks/useFirestore';
import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import FeedImageCarousel from '@/components/feed/FeedImageCarousel';
import FeedProfile from '@/components/feed/FeedProfile';
import FeedFooter from '@/components/feed/FeedFooter';
import {White} from '@/constants';

export default function FeedDetailScreen({route}: {route: {params: {feed: Feed}}}) {
  const {feed} = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <FeedProfile feed={feed} />
      <FeedImageCarousel imageDatas={feed.imageUrls} />
      <FeedFooter feed={feed} foldable={false} fullDate />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: White.DEFAULT,
  },
  contentContainer: {
    paddingVertical: 15,
    gap: 10,
  },
});
