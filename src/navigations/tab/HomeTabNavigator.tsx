import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedStackNavigator from '../stack/FeedStackNavigator';
import AddFeedNavigator from '../stack/AddFeedStackNavigator';
import ProfileStackNavigator from '../stack/ProfileStackNavigator';

export type HomeTabParamList = {
  Feed: undefined;
  Add_Post: undefined;
  Profile: undefined;
};

export default function HomeTabNavigator() {
  const Tab = createBottomTabNavigator<HomeTabParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Feed" component={FeedStackNavigator} />
      <Tab.Screen name="Add_Post" component={AddFeedNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}
