import {Brown, Gray} from '@/constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function FeedCarouselPagination({datas, pageIndex}: {datas: string[]; pageIndex: number}) {
  return (
    <View style={styles.container}>
      {datas.map((d, index) => (
        <View
          key={`${d}_${index}`}
          style={[
            styles.dot,
            {
              backgroundColor: pageIndex === index ? Brown.Primary : Gray.SECONDARY,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
  },
});
