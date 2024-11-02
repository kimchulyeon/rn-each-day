import React from 'react';
import HomeHeader from '@/components/common/HomeHeader';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';

export default function HomeLayout({children}: {children: React.ReactNode}) {
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      {children}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
