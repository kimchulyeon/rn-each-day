import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '@/screens/profile/ProfileScreen';

export type ProfileStackParamList = {
  Profile_Main: undefined;
};

export default function ProfileStackNavigator() {
  const Stack = createStackNavigator<ProfileStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile_Main" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
