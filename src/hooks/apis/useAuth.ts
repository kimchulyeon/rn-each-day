import {useMutation} from '@tanstack/react-query';
import useUserStore from '@/store/userStore';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import useFirebaseAuth from '../useFirebase';

export default function useAuth() {
  const {singupWithEmail, loginWithEmail, logout} = useFirebaseAuth();

  const signupMutation = useSignup();
  const logoutMutation = useLogout();
  const loginMutation = useLogin();

  // 회원가입
  function useSignup() {
    return useMutation<
      FirebaseAuthTypes.UserCredential,
      Error,
      {email: string; password: string}
    >({
      mutationFn: ({email, password}) => singupWithEmail(email, password),
    });
  }

  // 로그인
  function useLogin() {
    return useMutation<
      FirebaseAuthTypes.UserCredential,
      Error,
      {email: string; password: string}
    >({
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

  return {
    signupMutation,
    logoutMutation,
    loginMutation,
  };
}
