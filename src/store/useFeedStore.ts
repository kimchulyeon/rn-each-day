import {create} from 'zustand';

type FeedStoreType = {
  content: string;
  images: {id: string; uri: string}[];
  updateContent: (content: string) => void;
  updateImages: (newImages: {id: string; uri: string}[]) => void;
  removeImage: (id: string) => void;
  resetFeed: () => void;
};

const initialStates = {
  content: '',
  images: [
    // {id: '1', uri: 'https://picsum.photos/200'},
    // {id: '2', uri: 'https://picsum.photos/300'},
    // {id: '3', uri: 'https://picsum.photos/220'},
  ],
};

const useFeedStore = create<FeedStoreType>(set => ({
  // States
  ...initialStates,

  // Actions
  updateContent: (content: string) => {
    set({content});
  },
  updateImages: (newImages: {id: string; uri: string}[]) => {
    set(state => ({images: [...state.images, ...newImages]}));
  },
  removeImage: (id: string) => {
    set(state => ({images: state.images.filter(image => image.id !== id)}));
  },
  resetFeed: () => {
    set(initialStates);
  },
}));

export default useFeedStore;
