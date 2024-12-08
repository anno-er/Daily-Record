import React, {useState} from 'react';
import {
  Alert,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const LoginPage = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('错误', '用户名和密码不能为空');
      return;
    }
    // 在这里添加登录逻辑，例如发送API请求
    props.onLogin({username, password});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>登录</Text>
      <TextInput
        style={styles.input}
        placeholder="用户名"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="密码"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttontext}>登录</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: 10,
    borderRadius: 3,
    textAlign: 'center',
  },
  buttontext: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LoginPage;
