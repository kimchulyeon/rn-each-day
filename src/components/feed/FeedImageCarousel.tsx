import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import FeedCarouselItem from './FeedCarouselItem';
import FeedCarouselPagination from './FeedCarouselPagination';

export default function ImageCarousel({imageDatas}: {imageDatas: string[] | undefined}) {
  const [pageIndex, setPageIndex] = React.useState(0);
  const [viewWidth, setViewWidth] = React.useState(Dimensions.get('window').width);

  if (!imageDatas) {
    return null;
  }

  return (
    <View style={styles.imageContainer}>
      <FlatList
        data={imageDatas}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}_${index}`}
        renderItem={({item}) => <FeedCarouselItem item={item} />}
        onLayout={e => {
          setViewWidth(e.nativeEvent.layout.width);
        }}
        onScroll={e => {
          const contentOffsetX = e.nativeEvent.contentOffset.x;
          const currentIndex = Math.floor(contentOffsetX / viewWidth);
          // 0 ~ 2로 제한
          const clampedIndex = Math.max(0, Math.min(2, currentIndex));
          setPageIndex(clampedIndex);
        }}
      />

      <View style={styles.paginationContainer}>
        {imageDatas.length > 1 && <FeedCarouselPagination datas={imageDatas} pageIndex={pageIndex} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('window').height / 2.3,
    width: '100%',
    position: 'relative',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: -15,
    width: '100%',
  },
});
