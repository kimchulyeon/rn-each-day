import useUserStore, {User} from '@/store/userStore';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {firebase as firebaseFirestore} from '@react-native-firebase/firestore';
import {getAsyncStorage, removeAsyncStorage, storeAsyncStorage} from '@/lib/asyncStorage';

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
  const {updateUser, resetUser} = useUserStore();

  const DB = firestore();
  const USERS_COLLECTION = DB.collection('users');
  const CURRENT_USER = auth().currentUser;
  const CURRENT_USER_UID = CURRENT_USER?.uid;
  // const FEEDS_COLLECTION = DB.collection('feeds');

  // 최초 로그인 + 프로필 설정 시 유저 데이터 설정
  async function setUserProfile(displayName: string, photoUrl: string | undefined = '') {
    if (CURRENT_USER) {
      console.log('🚀 최초 유저 정보 firestore에 저장');
      // 유저 전역상태 + firestore에 유저 데이터 저장 + AsyncStorage에 유저 데이터 저장
      const INIT_USER_DATA: User = {
        uid: CURRENT_USER.uid,
        displayName,
        photoUrl,
        email: CURRENT_USER.email || '',
        isWithdrawal: false,
        createdAt: firebaseFirestore.firestore.FieldValue.serverTimestamp(),
        deletedAt: null,
        bookmarkedFeeds: [],
      };
      await CURRENT_USER.updateProfile({displayName, photoURL: photoUrl});
      await USERS_COLLECTION.doc(CURRENT_USER.uid).set(INIT_USER_DATA);
      await storeAsyncStorage<User>('userData', INIT_USER_DATA);
      updateUser(INIT_USER_DATA);
    }
  }

  // 앱 실행 시 AsyncStorage에 저장된 유저 데이터 가져오기
  async function checkSession() {
    const localStoredUserData: User | null = await getAsyncStorage('userData');
    const checkWithLocalStoredUser = await getUserDataFromDB(localStoredUserData?.uid);
    const checkWithNotLogoutUser = await getUserDataFromDB(CURRENT_USER_UID);
    const GET_OUT = !checkWithLocalStoredUser && !checkWithNotLogoutUser;

    if (GET_OUT) {
      await logout();
    }
  }

  // Firestore에서 유저 데이터 가져오기
  async function getUserDataFromDB(uid?: string) {
    if (!uid) {
      return null;
    }

    const userDoc = await USERS_COLLECTION.doc(uid).get();

    if (userDoc.exists) {
      console.log('🚀 유저 UID 폴더 있음');
      const userData = userDoc.data() as User;

      updateUser(userData);
      storeAsyncStorage<User>('userData', userData);
      return userDoc.data() as User;
    }
    return null;
  }

  // 로그아웃
  async function logout() {
    console.log('🚀 로그아웃 >>>>>>');
    await auth().signOut();
    await removeAsyncStorage('userData');
    resetUser();
  }

  return {
    logout,
    setUserProfile,
    checkSession,
    getUserDataFromDB,
  };
}
