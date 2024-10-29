import React from 'react';
import FeedScreen from '@/screens/feed/FeedScreen';
import {createStackNavigator} from '@react-navigation/stack';

export type FeedStackParamList = {
  Feed_Main: undefined;
};

export default function FeedStackNavigator() {
  const Stack = createStackNavigator<FeedStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Feed_Main" component={FeedScreen} />
    </Stack.Navigator>
  );
}
