import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export default function useFirebaseAuth() {
  // 현재 로그인한 사용자 정보 가져오기
  function checkCurrentUser() {
    return auth().currentUser;
  }

  // 이메일로 회원가입
  function singupWithEmail(
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential> {
    return auth().createUserWithEmailAndPassword(email.trim(), password.trim());
  }

  // 이메일로 로그인
  function loginWithEmail(
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential> {
    return auth().signInWithEmailAndPassword(email.trim(), password.trim());
  }

  return {
    checkCurrentUser,
    singupWithEmail,
    loginWithEmail,
  };
}
