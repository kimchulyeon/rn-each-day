import React from 'react';
import LoginScreen from '@/screens/auth/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';

export type AuthStackParamList = {
  Auth_Main: undefined;
};

export default function AuthStackNavigator() {
  const Stack = createStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth_Main"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
