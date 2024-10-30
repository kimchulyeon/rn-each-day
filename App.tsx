import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/apis';
import RootNavigator from '@/navigations/RootNavigator';
import Loading from '@/components/common/Loading';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
        <Loading />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
