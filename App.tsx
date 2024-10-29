import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import HomeTabNavigator from '@/navigations/tab/HomeTabNavigator';

// import HomeTabNavigator from '@/navigations/tab/HomeTabNavigator';

function App() {
  const isLogin = false;

  return (
    <NavigationContainer>
      {isLogin ? <HomeTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default App;
