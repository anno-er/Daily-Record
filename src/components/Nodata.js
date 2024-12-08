import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NoData = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.label || '暂无数据'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'gray',
  },
});

export default NoData;
