import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export default function useFirebaseAuth() {
  function singupWithEmail(
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential> {
    return auth().createUserWithEmailAndPassword(email.trim(), password.trim());
  }

  function loginWithEmail(
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential> {
    return auth().signInWithEmailAndPassword(email.trim(), password.trim());
  }

  function logout() {
    return auth().signOut();
  }

  return {
    singupWithEmail,
    loginWithEmail,
    logout,
  };
}
