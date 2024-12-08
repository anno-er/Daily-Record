import React from 'react';
import {FlexWidget, SvgWidget, TextWidget} from 'react-native-android-widget';
import {StyleSheet} from 'react-native';

const noSelectSvg = `<svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="787">
    <path d="M511.75144865 201.31081482c171.37615455 0 310.68918518 139.31303063 310.68918518 310.68918518s-139.31303063 310.68918518-310.68918518 310.68918518-310.68918518-139.31303063-310.68918518-310.68918518S340.49956978 201.31081482 511.75144865 201.31081482M511.75144865 139.17297778c-205.92479195 0-372.82702222 166.90223028-372.82702222 372.82702222 0 205.92479195 166.90223028 372.82702222 372.82702222 372.82702222s372.82702222-166.90223028 372.82702223-372.82702222C884.57847088 306.07520805 717.67624059 139.17297778 511.75144865 139.17297778L511.75144865 139.17297778z" fill="#f3f3f3" p-id="788"></path>
  </svg>`;
const halfSelectSvg = `<svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="848"><path d="M512 132.97167943C301.06249975 132.97167943 132.97167943 301.06249975 132.97167943 512S301.06249975 891.02832057 512 891.02832057 891.02832057 722.93750025 891.02832057 512 719.64160156 132.97167943 512 132.97167943z m0 685.54687526c-168.09082031 0-306.51855469-138.42773438-306.51855469-306.51855469 0-168.09082031 138.42773438-306.51855469 306.51855469-306.51855469 168.09082031 0 306.51855469 138.42773438 306.51855469 306.51855469-3.29589869 168.09082031-138.42773438 306.51855469-306.51855469 306.51855469z" fill="#F1962E" p-id="849"></path>
    <path d="M512 742.71289088c-125.24414037 0-230.71289088-102.17285182-230.71289088-230.71289088 0-125.24414037 102.17285182-230.71289088 230.71289088-230.71289088 125.24414037 0 230.71289088 102.17285182 230.71289088 230.71289088-3.29589869 125.24414037-105.46874975 230.71289088-230.71289088 230.71289088z" fill="#F1962E" p-id="850"></path>
  </svg>`;
const allSelectSvg = `<svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="817"><path d="M512 136.205128c-206.769231 0-377.435897 169.025641-377.435897 375.794872 0 206.769231 169.025641 375.794872 377.435897 375.794872 206.769231 0 377.435897-169.025641 377.435897-375.794872-1.641026-206.769231-170.666667-375.794872-377.435897-375.794872" fill="#F1962E" p-id="818"></path>
    <path d="M438.153846 638.358974l292.102564-292.102564 41.025641 41.025641-292.102564 292.102564-41.025641 41.025641-180.51282-180.51282 41.025641-41.025641 139.487179 139.487179z" fill="#FFFFFF" p-id="819"></path>
  </svg>`;
/* 0-未选择 1-选择 2-半选 */
export function StatuRadio(props) {
  const {statu} = props;
  const svgCtx =
    statu === 2 ? halfSelectSvg : statu === 1 ? allSelectSvg : noSelectSvg;
  return (
    <FlexWidget
      style={styles.container}
      clickAction="HandleRecord"
      clickActionData={props}>
      <SvgWidget svg={svgCtx} style={{height: 20, width: 20}} />
      <TextWidget text={props.label || 'Null'} style={styles.label} />
    </FlexWidget>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  label: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'left',
    marginLeft: 5,
    width: 120,
    height: 20,
  },
});
