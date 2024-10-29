import {create} from 'zustand';

type UserStoreType = {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
};

const useUserStore = create<UserStoreType>(set => ({
  isLogin: false,
  setIsLogin: (isLogin: boolean) => set({isLogin}),
}));

export default useUserStore;
