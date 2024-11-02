import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import FeedItem from './FeedItem';
import useFirestore, {Feed} from '@/hooks/useFirestore';
import PlaceholderImage from '../common/PlaceholderImage';

export default function FeedList({refreshParams}: {refreshParams?: number}) {
  const {getPagedFeeds, fetchInitialFeeds} = useFirestore();

  const flatListRef = React.useRef<FlatList>(null);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [feeds, setFeeds] = React.useState<Feed[]>([]);
  // 마지막 페이지인거 체크 안했더니 위로 갔다가 내리면 계속 불러옴
  const [lastPage, setLastPage] = React.useState(false);
  const [isEndReaching, setIsEndReaching] = React.useState(false);

  useEffect(() => {
    onRefresh(); // 초기 데이터 로드
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (refreshParams) {
      console.log('🔵 파라미터 전달');
      onRefresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshParams]);

  const onEndReached = async () => {
    if (isEndReaching || lastPage) {
      return;
    }
    setIsEndReaching(true);

    const moreFeeds = await getPagedFeeds();
    if (moreFeeds.length === 0) {
      setLastPage(true);
    } else {
      setFeeds(prevFeeds => [...prevFeeds, ...moreFeeds]);
    }
    setIsEndReaching(false);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    setLastPage(false);
    const initialFeeds = await fetchInitialFeeds();
    setFeeds(initialFeeds);
    setIsRefreshing(false);
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({animated: false, offset: 0});
    }, 100);
  };

  if (feeds.length === 0) {
    return (
      <View>
        <PlaceholderImage withText="피드가 없습니다." />
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
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
