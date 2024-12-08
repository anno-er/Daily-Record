import React from 'react';
import {FlexWidget} from 'react-native-android-widget';
import {StatuRadio} from './StatuRadio';

export function TaskList(props) {
  const TaskData = props.list || [];
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        justifyContent: 'space-evenly',
      }}>
      {TaskData.map(item => (
        <StatuRadio
          key={item.id}
          label={item.label}
          statu={item.statu}
          id={item.id}
        />
      ))}
    </FlexWidget>
  );
}
