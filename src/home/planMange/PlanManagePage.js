import React, {useState, useEffect} from 'react';
import NoData from '../../components/Nodata';
import PlanList from './PlanList';
import {useSelector} from 'react-redux';
import WidgetPreviewScreen from '../../widgets/WidgetPreview';
import uuid from 'react-native-uuid';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  AppState,
} from 'react-native';
import {retrieveData, storeData} from '../../store/Asynctore';

const PlanManagePage = () => {
  /* 获取当前用户名 */
  const userName = useSelector(state => state.user.username);

  /* 计划队列 */
  const [plans, setPlans] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // 从AsyncStorage中获取数据
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await retrieveData(userName);
        if (data && data.plans && data.plans.length > 0) {
          setPlans(data.plans);
        }
      } catch (e) {
        console.error('Failed to fetch plans:', e);
      }
    };
    fetchPlans();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        fetchPlans();
      }
    });
    return () => {
      subscription.remove();
    };
  }, [userName]);

  // 添加计划
  const addPlan = async () => {
    if (inputValue.trim() !== '') {
      let userData = await retrieveData(userName);
      userData = typeof userData === 'string' ? JSON.parse(userData) : userData;
      if (userData && userData.plans) {
        userData.plans.push({
          ID: uuid.v4(),
          name: inputValue,
          records: [],
        });
      }
      try {
        await storeData(userName, userData);
        ToastAndroid.show('添加成功', ToastAndroid.SHORT);
        setPlans([...userData.plans]);
        setInputValue('');
      } catch (error) {
        //
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Daily Plans</Text>
      {plans.length === 0 ? (
        <NoData label="暂无计划数据" />
      ) : (
        <PlanList planData={plans} />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new plan..."
          value={inputValue}
          onChangeText={setInputValue}
        />
        {inputValue.trim() !== '' && (
          <TouchableOpacity style={styles.addButton} onPress={addPlan}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* <WidgetPreviewScreen /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  planItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  addButton: {
    width: 48,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PlanManagePage;
