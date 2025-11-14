import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const loadData = async (key, defaultValue = null) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const clearAll = async () => {
  await AsyncStorage.clear();
};

export const clearData = async (key) => {
  await AsyncStorage.removeItem(key);
};
