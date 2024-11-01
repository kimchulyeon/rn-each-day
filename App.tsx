import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/apis';
import RootNavigator from '@/navigations/RootNavigator';
import Loading from '@/components/common/Loading';
import SplashView from '@/components/common/SplashView';
import useFirestore from '@/hooks/useFirestore';

function App() {
  const {loadUserDataFromAsyncStorage} = useFirestore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkStoredUserData() {
      try {
        await loadUserDataFromAsyncStorage();
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }

    checkStoredUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <SplashView />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* 루트 */}
        <RootNavigator />
        {/* 로딩 */}
        <Loading />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
