import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {create} from 'zustand';

export type User = {
  displayName: string;
  email: string;
  uid: string;
  isWithdrawal: boolean;
  createdAt: FirebaseFirestoreTypes.FieldValue;
  deletedAt: FirebaseFirestoreTypes.FieldValue | null;
  bookmarkedFeeds: string[];
  photoUrl?: string;
};

type UserStoreType = {
  user: User | null;
  updateUser: (user: User) => void;
  resetUser: () => void;
};

const initialStates = {
  user: null,
};

const useUserStore = create<UserStoreType>(set => ({
  // States
  ...initialStates,

  // Actions
  updateUser: (user: User) => {
    set({user});
  },
  resetUser: () => {
    set({user: null});
  },
}));

export default useUserStore;
