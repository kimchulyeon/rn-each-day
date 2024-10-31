import {create} from 'zustand';

export type User = {
  displayName?: string;
  email: string;
  photoUrl?: string;
  uid: string;
};

type UserStoreType = {
  user: User;
  isLogin: boolean;
  setUserStore: (user: User) => void;
  setIsLogin: (isLogin: boolean) => void;
};

const useUserStore = create<UserStoreType>(set => ({
  isLogin: false,
  user: {
    email: '',
    uid: '',
  },

  setUserStore: (user: User) => set({user}),
  setIsLogin: (isLogin: boolean) => set({isLogin}),
}));

export default useUserStore;
