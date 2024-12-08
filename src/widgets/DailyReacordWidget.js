import React from 'react';
import {FlexWidget, TextWidget, SvgWidget} from 'react-native-android-widget';
import {StyleSheet, Dimensions} from 'react-native';
import {TaskList} from './TaskList';

import {getDate, getDaysInCurrentMonth} from '../utils';

const HeadIconSvg =
  '<svg t="1731334878841" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="938" width="200" height="200"><path d="M204.8 443.733333a102.4 102.4 0 0 1 102.4-102.4h546.133333a102.4 102.4 0 0 1 102.4 102.4v273.066667a204.8 204.8 0 0 1-204.8 204.8H307.2a102.4 102.4 0 0 1-102.4-102.4V443.733333z" fill="#FFAC4A" opacity=".4" p-id="939"></path><path d="M529.066667 170.666667h-136.533334v17.066666a102.4 102.4 0 1 1-204.8 0V170.666667H170.666667a102.4 102.4 0 0 0-102.4 102.4v426.666666a102.4 102.4 0 0 0 102.4 102.4h563.2a102.4 102.4 0 0 0 102.4-102.4V273.066667a102.4 102.4 0 0 0-102.4-102.4v17.066666a102.4 102.4 0 1 1-204.8 0V170.666667z" fill="#FFAC4A" opacity=".8" p-id="940"></path><path d="M238.933333 119.466667a51.2 51.2 0 1 1 102.4 0v68.266666a51.2 51.2 0 1 1-102.4 0v-68.266666zM580.266667 119.466667a51.2 51.2 0 0 1 102.4 0v68.266666a51.2 51.2 0 0 1-102.4 0v-68.266666z" fill="#FFAC4A" opacity=".6" p-id="941"></path><path d="M589.038933 422.5024l-171.963733 147.456-46.08-48.605867a42.9056 42.9056 0 0 0-70.656 12.458667 43.554133 43.554133 0 0 0 8.260267 47.581867l74.24 78.267733a43.281067 43.281067 0 0 0 31.197866 13.448533c10.24 0 20.1728-3.652267 27.989334-10.376533l202.990933-174.045867a43.690667 43.690667 0 0 0 4.881067-61.2352 42.973867 42.973867 0 0 0-60.859734-4.949333z" fill="#FDFFB1" p-id="942"></path></svg>';

const screenwidth = Dimensions.get('window').width;

export default function DailyReacordWidget(props) {
  const [dayStr, dateStr] = getDate();
  const monthCheckStr = `${props.monthCheckDays}/${getDaysInCurrentMonth()}`;
  const continuesCheckStr = props.continueCheckDays + '';
  return (
    <FlexWidget style={styles.container}>
      {/* 头部标题容器 */}
      <FlexWidget style={styles.header}>
        <SvgWidget svg={HeadIconSvg} style={{height: 30, width: 30}} />
        <TextWidget text="日纪" style={styles.headerText} />
      </FlexWidget>
      {/* 上层容器 */}
      <FlexWidget style={styles.content}>
        {/* 左侧任务列表容器 */}
        <FlexWidget style={styles.taskListContainer}>
          {/* 任务列表 */}
          <TaskList list={props.list} />
        </FlexWidget>

        {/* 右侧日期卡片 */}
        <FlexWidget style={styles.dateCardContainer}>
          <TextWidget style={styles.date_D} text={dayStr} />
          <TextWidget style={styles.date_MY} text={dateStr} />
        </FlexWidget>
      </FlexWidget>
      {/* 底部文本容器 */}
      <FlexWidget style={styles.bottom}>
        <TextWidget
          text={`本月打卡 ${monthCheckStr},  连续打卡 ${continuesCheckStr} 天`}
          style={styles.bottomText}
        />
      </FlexWidget>
    </FlexWidget>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: screenwidth - 45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 0,
    backgroundGradient: {
      from: '#54BCBD',
      to: '#ffffff',
      orientation: 'TOP_BOTTOM',
    },
    borderRadius: 16,
  },
  header: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'YZCute',
    color: '#101010',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  taskListContainer: {
    flex: 1,
    height: '100%',
    padding: 12,
  },
  dateCardContainer: {
    width: 120,
    paddingBottom: 12,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  date_D: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#101010',
    width: '100%',
    textAlign: 'right',
  },
  date_MY: {
    fontSize: 14,
    color: '#101010',
    width: '100%',
    textAlign: 'right',
  },

  bottom: {
    height: 20,
    width: '100%',
    marginTop: 8,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Inter',
    color: '#101010',
  },
});
