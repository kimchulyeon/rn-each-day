import {useMutation} from '@tanstack/react-query';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import useFirestore from '../useFirestore';

export default function useAuth() {
  const {singupWithEmail, loginWithEmail} = useFirebaseAuth();
  const {logout} = useFirestore();

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
    return useMutation<void, Error, void>({
      mutationFn: logout,
    });
  }

  return {
    signupMutation,
    logoutMutation,
    loginMutation,
  };
}
