import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedStackNavigator from '../stack/FeedStackNavigator';
import AddFeedNavigator from '../stack/AddFeedStackNavigator';
import ProfileStackNavigator from '../stack/ProfileStackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {Brown} from '@/constants';

export type HomeTabParamList = {
  Feed: undefined;
  Add_Post: undefined;
  Profile: undefined;
};

const TabBarIcon = ({focused, name}: {focused: boolean; name: string}) => (
  <>
    {focused ? (
      <Icon name={name} size={30} color={Brown.Primary} />
    ) : (
      <Icon name={`${name}-outline`} size={30} color={Brown.Secondary} />
    )}
  </>
);

export default function HomeTabNavigator() {
  const Tab = createBottomTabNavigator<HomeTabParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Feed"
        component={FeedStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => TabBarIcon({focused, name: 'book'}),
        }}
      />
      <Tab.Screen
        name="Add_Post"
        component={AddFeedNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => TabBarIcon({focused, name: 'add-circle'}),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => TabBarIcon({focused, name: 'person'}),
        }}
      />
    </Tab.Navigator>
  );
}
