import React from 'react';
import {FlatList} from 'react-native';
import FeedItem from './FeedItem';

export default function FeedList() {
  // const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isRefreshing] = React.useState(false);

  function onEndReached() {
    console.log('스크롤이 끝에 도달하면 다음 데이터를 페칭');
  }

  function onRefresh() {
    console.log('새로고침 하면 새로 데이터를 페칭');
  }

  return (
    <FlatList
      data={[1, 2, 3]}
      renderItem={() => <FeedItem />}
      keyExtractor={item => item.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      scrollIndicatorInsets={{right: 1}}
    />
  );
}
