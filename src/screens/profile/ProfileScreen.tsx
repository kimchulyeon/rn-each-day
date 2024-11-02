import React from 'react';
import HomeLayout from '@/layout/HomeLayout';
import useAuth from '@/hooks/apis/useAuth';
import PrimaryButton from '@/components/common/PrimaryButton';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

export default function ProfileScreen() {
  const {logoutMutation} = useAuth();

  return (
    <HomeLayout>
      <View style={styles.container}>
        <PrimaryButton label="Logout" onPress={() => logoutMutation.mutate()} />
      </View>
    </HomeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
