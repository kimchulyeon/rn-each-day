import React from 'react';
import HomeLayout from '@/layout/HomeLayout';
import {Button, Text} from 'react-native';
import useAuth from '@/hooks/apis/useAuth';

export default function ProfileScreen() {
  const {logoutMutation} = useAuth();

  return (
    <HomeLayout>
      <Text>Profile Screen</Text>

      <Button title="Logout" onPress={() => logoutMutation.mutate()} />
    </HomeLayout>
  );
}
