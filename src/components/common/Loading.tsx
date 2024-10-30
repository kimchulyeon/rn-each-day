import React from 'react';
import useLoadingStore from '@/store/loadingStore';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';
import {Brown} from '@/constants';

export default function Loading() {
  const {isLoading} = useLoadingStore();

  return (
    <Modal visible={isLoading} transparent>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={Brown.Primary} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
