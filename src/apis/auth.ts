import auth from '@react-native-firebase/auth';

export async function loginWithEmail(email: string, password: string) {
  await auth().createUserWithEmailAndPassword(email.trim(), password.trim());
}

export async function logout() {
  await auth().signOut();
}
