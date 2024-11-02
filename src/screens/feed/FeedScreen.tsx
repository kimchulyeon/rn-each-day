import FeedList from '@/components/feed/FeedList';
import React from 'react';
import HomeLayout from '@/layout/HomeLayout';
import AddFeedButton from '@/components/feed/AddFeedButton';

export default function FeedScreen() {
  return (
    <HomeLayout>
      <FeedList />
      <AddFeedButton />
    </HomeLayout>
  );
}
