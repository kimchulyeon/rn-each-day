import useUserStore, {User} from '@/store/userStore';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import {firebase as firebaseFirestore} from '@react-native-firebase/firestore';
import {
  getAsyncStorage,
  removeAsyncStorage,
  storeAsyncStorage,
} from '@/lib/asyncStorage';

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
  const {user, updateUser, resetUser} = useUserStore();

  const DB = firestore();
  const UID = user?.uid || auth().currentUser?.uid;
  const USERS_COLLECTION = DB.collection('users');
  const currentUser = auth().currentUser;
  // const FEEDS_COLLECTION = DB.collection('feeds');

  // 최초 로그인 + 프로필 설정 시 유저 데이터 설정
  async function setUserProfile(
    displayName: string,
    photoUrl: string | undefined = '',
  ) {
    if (currentUser) {
      console.log('🚀 최초 유저 정보 firestore에 저장');
      // 유저 전역상태 + firestore에 유저 데이터 저장 + AsyncStorage에 유저 데이터 저장
      const FIRST_USER_DATA: User = {
        uid: currentUser.uid,
        displayName,
        photoUrl,
        email: currentUser.email || '',
        isWithdrawal: false,
        createdAt: firebaseFirestore.firestore.FieldValue.serverTimestamp(),
        deletedAt: null,
        bookmarkedFeeds: [],
      };
      await currentUser.updateProfile({displayName, photoURL: photoUrl});
      await firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .set(FIRST_USER_DATA);
      await storeAsyncStorage<User>('userData', FIRST_USER_DATA);
      updateUser(FIRST_USER_DATA);
    }
  }

  // 앱 실행 시 AsyncStorage에 저장된 유저 데이터 가져오기
  async function loadUserDataFromAsyncStorage(): Promise<User | null> {
    // Async Storage에서 초기 사용자 데이터 로드
    const userJsonFromAsyncStorage = await getAsyncStorage('userData');
    if (userJsonFromAsyncStorage) {
      console.log('userJsonFromAsyncStorage', userJsonFromAsyncStorage);
      console.log('🚀 AsyncStorage에 유저 데이터 있음');
      updateUser(userJsonFromAsyncStorage);
      return userJsonFromAsyncStorage;
    } else {
      console.log('🚀 AsyncStorage에 유저 데이터 없음');
      // 없으면 Firestore에서 데이터 체크해서 가져오기 ( 로그아웃 호출 안하면 auth().currentUser 그대로 남아있을듯? )

      const userData = await getUserDataFromDB();

      if (userData) {
        console.log(
          '🚀 하지만 UID폴더로 저장된 데이터가 firestore에 있어서 로그인하고 AsyncStorage에 저장',
        );
        return userData;
      } else {
        console.log('🚀 firestore에도 없음');
        return null;
      }
    }
  }

  // 로그아웃
  async function logout() {
    console.log('🚀 로그아웃 >>>>>>');
    await auth().signOut();
    await removeAsyncStorage('userData');
    resetUser();
  }

  // Firestore에서 유저 데이터 가져오기
  async function getUserDataFromDB(uid?: string) {
    const userId = uid || UID;
    const userDoc = await USERS_COLLECTION.doc(userId).get();
    if (userDoc.exists) {
      console.log('🚀 유저 UID 폴더 있음');
      const userData = userDoc.data() as User;
      updateUser(userData);
      storeAsyncStorage<User>('userData', userData);
      return userDoc.data() as User;
    }
    return null;
  }

  return {
    logout,
    setUserProfile,
    loadUserDataFromAsyncStorage,
    getUserDataFromDB,
  };
}
