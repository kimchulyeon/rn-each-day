import React from 'react';
import {Salgu} from '@/constants';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {useNavigation} from '@react-navigation/native';

export default function AddFeedButton() {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();

  function showAddFeedScreen() {
    navigation.navigate('Add_Feed');
  }

  return (
    <Pressable onPress={showAddFeedScreen} style={styles.addButton}>
      <Icon name="add" size={20} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Salgu.Secondary,
    padding: 10,
    borderRadius: 50,
  },
});
