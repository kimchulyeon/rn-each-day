import FeedList from '@/components/feed/FeedList';
import React, {useEffect, useState} from 'react';
import HomeLayout from '@/layout/HomeLayout';
import AddFeedButton from '@/components/feed/AddFeedButton';

export default function FeedScreen({route}: {route: {params: {refresh?: number}}}) {
  const [refreshParams, setRefreshParams] = useState<number | undefined>(route.params?.refresh);

  useEffect(() => {
    // route.params.refresh가 변경될 때마다 refreshParams 업데이트
    if (route.params?.refresh) {
      setRefreshParams(route.params.refresh);
    }
  }, [route.params?.refresh]);

  return (
    <HomeLayout>
      <FeedList refreshParams={refreshParams} />
      <AddFeedButton />
    </HomeLayout>
  );
}
