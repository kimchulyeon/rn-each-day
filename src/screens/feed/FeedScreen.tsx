import FeedList from '@/components/feed/FeedList';
import React from 'react';
import HomeLayout from '@/layout/HomeLayout';

export default function FeedScreen() {
  return (
    <HomeLayout>
      <FeedList />
    </HomeLayout>
  );
}
