import AsyncStorage from '@react-native-async-storage/async-storage';

const storeAsyncStorage = async <T>(key: string, data: T) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

const getAsyncStorage = async (key: string) => {
  const storedData = await AsyncStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

const removeAsyncStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export {storeAsyncStorage, getAsyncStorage, removeAsyncStorage};
