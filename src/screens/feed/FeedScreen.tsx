import FeedList from '@/components/feed/FeedList';
import FeedScreenHeader from '@/components/feed/FeedScreenHeader';
import useAuth from '@/hooks/apis/useAuth';
import React from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';

export default function FeedScreen() {
  const {logoutMutation} = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <FeedScreenHeader />
      <FeedList />
      <Button title="Logout" onPress={() => logoutMutation.mutate()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
