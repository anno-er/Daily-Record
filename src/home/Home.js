/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {View, StyleSheet, ToastAndroid, Button} from 'react-native';
// import WidgetPreviewScreen from '../widgets/WidgetPreview';
import PlanManagePage from './planMange/PlanManagePage';
import LoginPage from './login/LoginPage';
import {
  retrieveData,
  storeData,
  initAsyncStorage,
  removeData,
} from '../store/Asynctore';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setUser} from '../store/slices/userSlice';

const Home = () => {
  /* 清楚AsyncStorage数据，调试使用 */
  const handleMock = async () => {
    // await removeData('user');
    // await removeData('Ringo');
    // const userData = await retrieveData('Ringo');
    // userData.plans[0].records = [
    //   '2024-11-27',
    //   '2024-11-28',
    //   '2024-11-29',
    //   '2024-12-01',
    //   '2024-12-02',
    // ];
    // userData.plans[1].records = [
    //   '2024-11-25',
    //   '2024-11-26',
    //   '2024-11-27',
    //   '2024-11-28',
    //   '2024-11-29',
    //   '2024-12-01',
    // ];
    // await storeData('Ringo', userData);
  };
  /* redux 分发 */
  const dispatch = useDispatch();
  const [userExist, setUserExist] = useState(false);

  const handleLogin = async userInfo => {
    dispatch(setUser(userInfo.username));
    try {
      await initAsyncStorage(userInfo.username);
      setUserExist(true);
      storeData('user', userInfo);
      ToastAndroid.show('登录成功', ToastAndroid.SHORT);
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    const getUser = async () => {
      retrieveData('user').then(user => {
        if (user && user.username !== '') {
          setUserExist(true);
          dispatch(setUser(user.username));
        } else {
          setUserExist(false);
        }
      });
    };
    getUser();
  }, []);
  return (
    <View style={styles.container}>
      {/* <Button onPress={handleMock} title="调试" /> */}
      {!userExist ? <LoginPage onLogin={handleLogin} /> : <PlanManagePage />}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
