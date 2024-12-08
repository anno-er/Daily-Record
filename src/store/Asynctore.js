import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
// 初始化数据
export async function initAsyncStorage(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      await storeData(key, {
        name: key,
        plans: [],
        createdAt: new Date().toISOString(),
        Id: uuid.v4(),
      });
    }
  } catch (error) {
    console.error('Error init data:', error);
  }
}

// 存储数据
export async function storeData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error storing data:', error);
  }
}

// 检索数据
export async function retrieveData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}

// 删除数据
export async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
  }
}
