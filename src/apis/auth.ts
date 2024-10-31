import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
export async function singupWithEmail(email: string, password: string) {
  await auth().createUserWithEmailAndPassword(email.trim(), password.trim());
}

export async function loginWithEmail(
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential> {
  const response = await auth().signInWithEmailAndPassword(
    email.trim(),
    password.trim(),
  );
  return response;
}

export async function logout() {
  await auth().signOut();
}
