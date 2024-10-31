import React from 'react';
import LoginScreen from '@/screens/auth/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '@/screens/auth/SignupScreen';

export type AuthStackParamList = {
  Auth_Main: undefined;
  Auth_Signup: undefined;
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
      <Stack.Screen
        name="Auth_Signup"
        component={SignupScreen}
        options={{
          headerTitle: '회원가입',
          headerBackTitle: '로그인',
        }}
      />
    </Stack.Navigator>
  );
}
