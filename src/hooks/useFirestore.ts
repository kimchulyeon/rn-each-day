import firestore from '@react-native-firebase/firestore';

export default function useFirestore() {
  const DB = firestore();
  const USERS_COLLECTION = DB.collection('users');
  const FEEDS_COLLECTION = DB.collection('feeds');

  return {};
}
