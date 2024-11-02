import React from 'react';
import {Gray} from '@/constants';
import {StyleSheet, View} from 'react-native';

export default function FeedFooter() {
  return <View style={styles.footer} />;
}

const styles = StyleSheet.create({
  footer: {
    height: 50,
    backgroundColor: Gray.DEFAULT,
  },
});
