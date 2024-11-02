import React from 'react';
import FeedScreen from '@/screens/feed/FeedScreen';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import AddFeedScreen from '@/screens/feed/AddFeedScreen';
import {Alert, Pressable, StyleSheet, Text} from 'react-native';
import {Black, Gray, Salgu} from '@/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import useFeedStore from '@/store/useFeedStore';
import useFirestore from '@/hooks/useFirestore';
import useLoadingStore from '@/store/loadingStore';

export type FeedStackParamList = {
  Feed_Main: undefined;
  Add_Feed: undefined;
};

function AddFeedBackButton(navigation: StackNavigationProp<FeedStackParamList>) {
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Icon name="close-outline" style={styles.backButton} />
    </Pressable>
  );
}

function AddFeedButton(navigation: StackNavigationProp<FeedStackParamList>) {
  const {content, images} = useFeedStore();
  const {addFeedToDB} = useFirestore();
  const {showLoading, hideLoading} = useLoadingStore();

  async function onAddFeed() {
    showLoading();
    try {
      await addFeedToDB(content, images);
      navigation.goBack();
    } catch (error) {
      Alert.alert('피드를 올리는데 실패했습니다.');
      console.error(error);
    } finally {
      hideLoading();
    }
    // firestore에 이미지 url, content, user 정보 저장
    // 📌 feedId 때문에 Storage에 저장하는 로직도 포함
  }

  return (
    <Pressable onPress={onAddFeed} disabled={!content.trim() && images.length === 0}>
      <Text style={styles.addButton}>올리기</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {paddingHorizontal: 10, fontSize: 25, color: Black.DEFAULT},
  addButton: {paddingHorizontal: 10, fontSize: 15, fontWeight: 'bold', color: Salgu.Secondary},
});

export default function FeedStackNavigator({navigation}: {navigation: StackNavigationProp<FeedStackParamList>}) {
  const Stack = createStackNavigator<FeedStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed_Main"
        component={FeedScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add_Feed"
        component={AddFeedScreen}
        options={{
          headerTitle: '새로운 피드',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: Gray.LIGHT},
          headerLeft: () => AddFeedBackButton(navigation),
          headerRight: () => AddFeedButton(navigation),
        }}
      />
    </Stack.Navigator>
  );
}
