import useAuth from '@/hooks/apis/useAuth';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';

export default function FeedScreen() {
  const {logoutMutation} = useAuth();

  function onLogout() {
    logoutMutation.mutate();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Diary Screen</Text>
      <Button title="Logout" onPress={onLogout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
