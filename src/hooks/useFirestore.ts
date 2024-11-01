import useUserStore from '@/store/userStore';
import firestore, {serverTimestamp} from '@react-native-firebase/firestore';

export type UserFieldType = {
  displayName?: string;
  email?: string;
  photoUrl?: string;
  followingsCount?: number;
  followersCount?: number;
  createdAt?: any;
  isWithdrawal?: boolean;
  bookmarkdedFeeds?: string[];
};

export default function useFirestore() {
  const {user} = useUserStore();

  const DB = firestore();
  const UID = user.uid;
  const USERS_COLLECTION = DB.collection('users');
  // const FEEDS_COLLECTION = DB.collection('feeds');

  async function getUserDataFromDB() {
    const userDoc = await USERS_COLLECTION.doc(UID).get();
    return userDoc.data();
  }

  async function setUserDataToDB({
    displayName,
    email,
    photoUrl,
    followersCount,
    followingsCount,
    isWithdrawal,
  }: UserFieldType) {
    console.log(user);
    const data = {
      displayName: displayName || user.displayName,
      email: email || user.email,
      photoUrl: photoUrl ?? user.photoUrl ?? '',
      followingsCount: followingsCount || 0,
      followersCount: followersCount || 0,
      createdAt: serverTimestamp(),
      isWithdrawal: isWithdrawal || false,
      bookmarkedFeeds: [],
    };
    console.log(data);
    await USERS_COLLECTION.doc(UID).set(data);
  }

  return {
    getUserDataFromDB,
    setUserDataToDB,
  };
}
