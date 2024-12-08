import * as React from 'react';
import {WidgetPreview} from 'react-native-android-widget';
import DailyReacordWidget from './DailyReacordWidget';
import {getCheckInfo, getTodayTaskList} from '../utils';

export default function WidgetPreviewScreen() {
  const [monthCheckDays, setMonthCheckDays] = React.useState(0);
  const [continueCheckDays, setContinueCheckDays] = React.useState(0);
  const [todayTaskList, setTodayTaskList] = React.useState([]);
  React.useEffect(() => {
    getCheckInfo().then(([monthChkDays, continueChkDays]) => {
      setMonthCheckDays(monthChkDays);
      setContinueCheckDays(continueChkDays);
    });
    getTodayTaskList().then(list => {
      setTodayTaskList(list);
    });
  }, []);
  return (
    <WidgetPreview
      renderWidget={() => (
        <DailyReacordWidget
          monthCheckDays={monthCheckDays}
          continueCheckDays={continueCheckDays}
          list={todayTaskList}
        />
      )}
      width={320}
      height={200}
    />
  );
}
