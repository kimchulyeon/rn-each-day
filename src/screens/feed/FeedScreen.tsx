import FeedList from '@/components/feed/FeedList';
import FeedScreenHeader from '@/components/feed/FeedScreenHeader';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedScreenHeader />
      <FeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
