import {useMutation} from '@tanstack/react-query';

import {loginWithEmail, logout} from '@/apis/auth';
import useUserStore from '@/store/userStore';

function useLogin() {
  const {setIsLogin} = useUserStore();

  return useMutation<void, Error, {email: string; password: string}>({
    mutationFn: ({email, password}) => loginWithEmail(email, password),
    onSuccess: () => {
      setIsLogin(true);
    },
  });
}

function useLogout() {
  const {setIsLogin} = useUserStore();

  return useMutation<void, Error, void>({
    mutationFn: logout,
    onSuccess: () => {
      setIsLogin(false);
    },
  });
}

function useAuth() {
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    loginMutation,
    logoutMutation,
  };
}

export default useAuth;
