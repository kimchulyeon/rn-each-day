import React from 'react';
import AddFeedScreen from '@/screens/addFeed/AddFeedScreen';
import {createStackNavigator} from '@react-navigation/stack';

export type AddFeedStackParamList = {
  Add_Feed_Main: undefined;
};

export default function AddFeedNavigator() {
  const Stack = createStackNavigator<AddFeedStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Add_Feed_Main" component={AddFeedScreen} />
    </Stack.Navigator>
  );
}
