import {useMutation} from '@tanstack/react-query';
import {singupWithEmail, logout, loginWithEmail} from '@/apis/auth';
import useUserStore from '@/store/userStore';

// 회원가입
function useSignup() {
  return useMutation<void, Error, {email: string; password: string}>({
    mutationFn: ({email, password}) => singupWithEmail(email, password),
  });
}

// 로그인
function useLogin() {
  return useMutation<void, Error, {email: string; password: string}>({
    mutationFn: ({email, password}) => loginWithEmail(email, password),
  });
}

// 로그아웃
function useLogout() {
  const {setIsLogin} = useUserStore();

  return useMutation<void, Error, void>({
    mutationFn: logout,
    onSuccess: () => {
      setIsLogin(false);
    },
  });
}

export default function useAuth() {
  const signupMutation = useSignup();
  const logoutMutation = useLogout();
  const loginMutation = useLogin();

  return {
    signupMutation,
    logoutMutation,
    loginMutation,
  };
}
