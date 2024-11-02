import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FeedImageCarousel from './FeedImageCarousel';
import FeedProfile from './FeedProfile';
import FeedFooter from './FeedFooter';
import {Feed} from '@/hooks/useFirestore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';

function FeedItem({feed}: {feed: Feed}) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();

  function tapFeedItem() {
    navigation.navigate('Feed_Detail', {feed});
  }

  return (
    <View style={styles.container}>
      <FeedProfile feed={feed} />
      <FeedImageCarousel imageDatas={feed.imageUrls} />
      <Pressable onPress={tapFeedItem}>
        <FeedFooter feed={feed} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    marginTop: 10,
  },
});

export default FeedItem;
