import React from 'react';
import moment from 'moment';
import { DateConstants } from '../../constants';

export default class DateTHead extends React.Component {
  render(){
    let props = this.props;
    const { wrapperCls, value } = props;
    const localeData = value.localeData();
    const veryShortWeekdays = [];
    const weekDays = [];
    const firstDayOfWeek = localeData.firstDayOfWeek();
    const now = moment();
    for (let dateColIndex = 0; dateColIndex < DateConstants.DATE_COL_COUNT; dateColIndex++) {
      const index = (firstDayOfWeek + dateColIndex) % DateConstants.DATE_COL_COUNT;
      now.day(index);
      veryShortWeekdays[dateColIndex] = localeData.weekdaysMin(now);
      weekDays[dateColIndex] = localeData.weekdaysShort(now);
    }
    const weekDaysEls = weekDays.map((day, xindex) => {
     return (
       <th
         key={xindex}
         title={day}
         className={`${wrapperCls}-column-header`}
       >
         <span className={`${wrapperCls}-column-header-inner`}>
         {veryShortWeekdays[xindex]}
         </span>
       </th>);
   });
    return (
      <thead>
        <tr role="row">
          {weekDaysEls}
        </tr>
      </thead>
    )
  }
}
