import moment from 'moment';
import {retrieveData, storeData} from '../store/Asynctore';
/* 计算当前月的天数 */
export function getDaysInCurrentMonth() {
  const now = new Date();
  // 设置当前月的下一个月的第0天，即当前月的最后一天
  now.setMonth(now.getMonth() + 1, 0);
  // 获取当前月的天数
  return now.getDate();
}

/* 计算本月打卡和连续打卡 */
export const getCheckInfo = async () => {
  const user = await retrieveData('user');
  const userData = await retrieveData(user.username);
  let allPlanCheckDays = userData.plans.map(plan => plan.records);
  allPlanCheckDays = allPlanCheckDays.flat();
  allPlanCheckDays = [...new Set(allPlanCheckDays)];
  /* 计算连续打卡 */
  let currDay = moment().format('YYYY-MM-DD');
  let continusDays = 0;
  while (allPlanCheckDays.includes(currDay)) {
    continusDays += 1;
    currDay = moment(currDay).add(-1, 'days').format('YYYY-MM-DD');
  }

  const monthCheckDateSet = new Set();
  const currentYears = new Date().getFullYear() + '';
  const currentMonth = new Date().getMonth() + 1 + '';
  allPlanCheckDays.forEach(date => {
    const [year, month] = date.split('-');
    if (year === currentYears && month === currentMonth) {
      monthCheckDateSet.add(date);
    }
  });
  return [monthCheckDateSet.size, continusDays];
};

/* 计算今天的任务列表 */
export const getTodayTaskList = async () => {
  const user = await retrieveData('user');
  const userData = await retrieveData(user.username);

  const today = moment().format('YYYY-MM-DD');
  const todayTaskList = userData.plans.map(plan => {
    return {
      id: plan.ID,
      label: plan.name,
      statu: plan.records.at(-1) === today ? 1 : 0,
    };
  });
  return todayTaskList;
};

/* 生成一个js函数获取今天的日期，格式为[02, November 2024] */
export const getDate = () => {
  const date = new Date();
  const month = date.toLocaleString('default', {month: 'long'});
  const year = date.getFullYear();
  const day = date.getDate().toString().padStart(2, '0');
  return [day, `${month}  ${year}`];
};

/**
 * 更新数据  2024-12-03 21:39
 *
 * @param {string} planID - 计划ID
 * @return {}
 */
export const updateTaskList = async planID => {
  const user = await retrieveData('user');
  const userData = await retrieveData(user.username);
  const planIndex = userData.plans.findIndex(plan => plan.ID === planID);
  const plan = userData.plans[planIndex];
  const today = moment().format('YYYY-MM-DD');
  if (plan.records.at(-1) === today) {
    plan.records.pop();
  } else {
    plan.records.push(today);
  }
  await storeData(user.username, userData);
  return userData;
};
