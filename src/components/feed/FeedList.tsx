import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import FeedItem from './FeedItem';
import useFirestore, {Feed} from '@/hooks/useFirestore';

export default function FeedList({isRefresh}: {isRefresh?: boolean}) {
  const {getPagedFeeds, fetchInitialFeeds} = useFirestore();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [feeds, setFeeds] = React.useState<Feed[]>([]);

  useEffect(() => {
    onRefresh(); // 초기 데이터 로드
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isRefresh) {
      onRefresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefresh]);

  const onEndReached = async () => {
    const moreFeeds = await getPagedFeeds();
    setFeeds(prevFeeds => [...prevFeeds, ...moreFeeds]);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    const initialFeeds = await fetchInitialFeeds();
    setFeeds(initialFeeds);
    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={feeds}
      renderItem={({item}) => <FeedItem feed={item} />}
      keyExtractor={(item, index) => `${item.createdAt}_${index}`}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      scrollIndicatorInsets={{right: 1}}
    />
  );
}
