import React from 'react';
import DailyReacordWidget from '../DailyReacordWidget';
import {getCheckInfo, getTodayTaskList, updateTaskList} from '../../utils';

const nameToWidget = {
  // DailyRecord will be the **name** with which we will reference our widget.
  DailyRecord: DailyReacordWidget,
};

export async function widgetTaskHandler(props) {
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[widgetInfo.widgetName];

  switch (props.widgetAction) {
    case 'WIDGET_ADDED': {
      const [monthChkDays, continueChkDays] = await getCheckInfo();
      const todayTaskList = await getTodayTaskList();
      props.renderWidget(
        <Widget
          monthCheckDays={monthChkDays}
          continueCheckDays={continueChkDays}
          list={todayTaskList}
        />,
      );
      break;
    }

    case 'WIDGET_UPDATE':
      // Not needed for now
      break;

    case 'WIDGET_RESIZED':
      // Not needed for now
      break;

    case 'WIDGET_DELETED':
      // Not needed for now
      break;

    case 'WIDGET_CLICK': {
      // Not needed for now
      // console.log('@@props.widgetAction-->', props.clickActionData);
      await updateTaskList(props.clickActionData.id);
      const [monthChkDays, continueChkDays] = await getCheckInfo();
      const todayTaskList = await getTodayTaskList();
      props.renderWidget(
        <Widget
          monthCheckDays={monthChkDays}
          continueCheckDays={continueChkDays}
          list={todayTaskList}
        />,
      );
      break;
    }

    default:
      break;
  }
}
