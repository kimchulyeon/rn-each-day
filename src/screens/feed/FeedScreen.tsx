import FeedList from '@/components/feed/FeedList';
import React from 'react';
import HomeLayout from '@/layout/HomeLayout';
import AddFeedButton from '@/components/feed/AddFeedButton';

export default function FeedScreen({route}: {route: {params: {refresh?: boolean}}}) {
  const isRefresh = route.params?.refresh;

  return (
    <HomeLayout>
      <FeedList isRefresh={isRefresh} />
      <AddFeedButton />
    </HomeLayout>
  );
}
