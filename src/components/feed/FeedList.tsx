import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import FeedItem from './FeedItem';

export default function FeedList() {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  function onEndReached() {}

  function onRefresh() {}

  return (
    <FlatList
      data={[]}
      renderItem={({item}) => <FeedItem />}
      keyExtractor={item => item}
      contentContainerStyle={styles.contentContainer}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      scrollIndicatorInsets={{right: 1}}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
  },
});
