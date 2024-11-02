import {useState} from 'react';
import useUserStore, {User} from '@/store/userStore';
import auth from '@react-native-firebase/auth';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {firebase as firebaseFirestore} from '@react-native-firebase/firestore';
import {getAsyncStorage, removeAsyncStorage, storeAsyncStorage} from '@/lib/asyncStorage';
import useFirebaseStorage from './useFirebaseStorage';

export type UserFieldType = {
  displayName?: string;
  email?: string;
  photoUrl?: string;
  followingsCount?: number;
  followersCount?: number;
  createdAt?: FirebaseFirestoreTypes.FieldValue;
  isWithdrawal?: boolean;
  bookmarkdedFeeds?: string[];
};

export type Feed = {
  content: string;
  imageUrls?: string[];
  creator: string;
  createdAt: FirebaseFirestoreTypes.FieldValue;
  deletedAt: FirebaseFirestoreTypes.FieldValue | null;
  likeCount?: number;
  commentCount?: number;
};

export default function useFirestore() {
  const {updateUser, resetUser} = useUserStore();
  const {uploadFeedImages} = useFirebaseStorage();

  // #######################유저########################
  const DB = firestore();
  const USERS_COLLECTION = DB.collection('users');
  const CURRENT_USER = auth().currentUser;
  const CURRENT_USER_UID = CURRENT_USER?.uid;

  // 최초 로그인 + 프로필 설정 시 유저 데이터 설정
  async function setUserProfileToDB(displayName: string, photoUrl: string | undefined = '') {
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

  // ########################피드########################
  const FEEDS_COLLECTION = DB.collection('feeds');
  const PAGE_SIZE = 8;

  // 피드 작성
  async function addFeedToDB(content: string, images: {id: string; uri: string}[]) {
    if (CURRENT_USER_UID) {
      const newFeed: Feed = {
        content,
        creator: CURRENT_USER_UID,
        createdAt: firebaseFirestore.firestore.FieldValue.serverTimestamp(),
        deletedAt: null,
      };
      const feedRef = await FEEDS_COLLECTION.add(newFeed);
      const feedId = feedRef.id;

      const storedImageUrls = await uploadFeedImages(CURRENT_USER_UID, feedId, images);
      await feedRef.update({id: feedId, imageUrls: storedImageUrls});
      return feedId;
    }
  }

  // 모든 피드 가져오기
  async function getAllFeeds() {
    const feeds = await FEEDS_COLLECTION.get();
    return feeds.docs.map(doc => doc.data() as Feed);
  }

  // 마지막으로 가져온 폴더 저장
  const [lastVisible, setLastVisible] = useState<FirebaseFirestoreTypes.DocumentSnapshot | null>(null);

  // 페이징 피드 가져오기 함수
  async function getPagedFeeds(isRefresh = false) {
    let query = FEEDS_COLLECTION.orderBy('createdAt', 'desc').limit(PAGE_SIZE);

    // 초기 아니고 마지막으로 가져온 폴더 있을 때
    if (lastVisible && !isRefresh) {
      console.log('🚀 가져온 마지막 폴더 다음부터 가져오게 쿼리 업데이트');
      query = query.startAfter(lastVisible);
    }

    const snapshot = await query.get();
    const feeds = snapshot.docs.map(doc => doc.data() as Feed);
    console.log('🚀 피드 가져오기 >>>>>>>>>>>>>');

    // 마지막 문서 업데이트
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);

    return feeds;
  }

  async function fetchInitialFeeds() {
    console.log('🚀 초기 | 새로고침 시 피드 새로 호출');
    setLastVisible(null);
    return getPagedFeeds(true);
  }

  return {
    logout,
    setUserProfileToDB,
    checkSession,
    getUserDataFromDB,
    addFeedToDB,
    getAllFeeds,
    getPagedFeeds,
    fetchInitialFeeds,
  };
}
