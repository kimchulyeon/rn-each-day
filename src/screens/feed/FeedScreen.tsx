import useAuth from '@/hooks/apis/useAuth';
import {firebase} from '@react-native-firebase/auth';
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
      <Button
        title="Check"
        onPress={() => {
          console.log(firebase.auth().currentUser);
        }}
      />
      <Button
        title="Update"
        onPress={async () => {
          const update = {
            displayName: 'Alias',
            photoURL: 'https://my-cdn.com/assets/user/123.png',
          };

          await firebase.auth().currentUser?.updateProfile(update);
        }}
      />
      <Button title="Logout" onPress={onLogout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
