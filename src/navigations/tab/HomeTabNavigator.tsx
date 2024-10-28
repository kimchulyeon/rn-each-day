import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DiaryScreen from '@/screens/diary/DiaryScreen';
import AddPostScreen from '@/screens/addPost/AddPostScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';

export type HomeTabParamList = {
  Diary: undefined;
  Add_Post: undefined;
  Profile: undefined;
};

export default function HomeTabNavigator() {
  const Tab = createBottomTabNavigator<HomeTabParamList>();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Diary" component={DiaryScreen} />
      <Tab.Screen name="Add_Post" component={AddPostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
