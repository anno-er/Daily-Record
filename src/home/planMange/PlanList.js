import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

// 示例数据，实际使用时应替换为传入的真实数据
const planData = [
  {
    name: '学习计划',
    ID: 'plan1',
    records: ['2024-11-27', '2024-11-28', '2024-11-29', '2024-12-01'],
  },
  {
    name: '健身计划',
    ID: 'plan2',
    records: [
      '2024-11-25',
      '2024-11-26',
      '2024-11-27',
      '2024-11-28',
      '2024-11-29',
      '2024-12-01',
    ],
  },
];

// 计算近七天的日期范围
const getRecentSevenDays = () => {
  const today = new Date();
  const recentSevenDays = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    recentSevenDays.push(`${year}-${month}-${day}`);
  }
  return recentSevenDays;
};

const PlanList = props => {
  const recentSevenDays = getRecentSevenDays();
  const plans = props.planData;

  // 检查某一天是否打卡
  const isDayChecked = (plan, date) => {
    return plan.records.includes(date);
  };

  // 计算近三十日打卡统计
  const calculateMonthlyCheckCount = plan => {
    let thirtyDaysAgoTimestamp =
      new Date().getTime() - 30 * 24 * 60 * 60 * 1000;

    const thirtyCheckDays = plan.records.filter(item => {
      return new Date(item).getTime() >= thirtyDaysAgoTimestamp;
    });
    return `${thirtyCheckDays.length}/30`;
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{item.name}</Text>
        <View style={styles.checkStatus}>
          {recentSevenDays.map((date, index) => (
            <View
              key={index}
              style={[
                styles.checkDot,
                isDayChecked(item, date) && styles.checkedDot,
              ]}
            />
          ))}
        </View>
        <Text style={styles.tableCell}>{calculateMonthlyCheckCount(item)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>计划</Text>
        <Text style={styles.tableHeaderCell}>近七日打卡</Text>
        <Text style={styles.tableHeaderCell}>近30天打卡</Text>
      </View>
      <FlatList
        data={plans}
        renderItem={renderItem}
        keyExtractor={item => item.ID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  checkStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  checkDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginRight: 5,
  },
  checkedDot: {
    backgroundColor: 'green',
  },
});

export default PlanList;
