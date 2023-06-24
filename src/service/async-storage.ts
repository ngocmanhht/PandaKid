import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {
  fetchIsFirstLaunch = async () => {
    const isFirstLaunch = await AsyncStorage.getItem('is_first_launch');
    if (isFirstLaunch != null) {
      const parsed = JSON.parse(isFirstLaunch);
      return parsed;
    }
    return false;
  };
  setTypeAccount = (type: any) => {
    AsyncStorage.setItem('type_account', JSON.stringify(type));
  };
  setFirstLaunch = () =>
    AsyncStorage.setItem('is_first_launch', JSON.stringify(true));

  setAccessToken = (accessToken: string) =>
    AsyncStorage.setItem('access_token', accessToken);

  clearAccessToken = () => AsyncStorage.removeItem('access_token');
}

const asyncStorageService = new AsyncStorageService();

export default asyncStorageService;
