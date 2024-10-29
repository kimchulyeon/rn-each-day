import React from 'react';
import AuthStackNavigator from './stack/AuthStackNavigator';
import HomeTabNavigator from './tab/HomeTabNavigator';
import useUserStore from '@/store/userStore';

function RootNavigator() {
  const {isLogin} = useUserStore();

  return <>{isLogin ? <HomeTabNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
