import React from 'react';
import moment from 'moment';
import { DateConstants } from '../../constants';

export default class DateTBody extends React.Component {
  isBeforeYearOrMonth(date1, date2){
    if(date1.year() < date2.year()){
      return true;
    }
    return date1.year() === date2.year() && date1.month() < date2.month();
  }
  isAfterYearOrMonth(date1, date2){
    if(date1.year() > date2.year()){
      return true;
    }
    return date1.year() === date2.year() && date1.month() > date2.month();
  }
  render(){
    const props = this.props;
    const { wrapperCls, value, selectedValue, sectionType, isRange, disabledDate } = props;
    let currentDay;
    let xIndex;
    let yIndex;
    const sectionRowClass = `${wrapperCls}-section-row`;
    const sectionSelectedClass = `${wrapperCls}-section-selected`;
    const cellClass = `${wrapperCls}-column-date-cell`;
    const rangeClass = `${wrapperCls}-range-cell`;
    const dateClass = `${wrapperCls}-date`;
    const nowClass = `${wrapperCls}-now`;
    const disabledClass = `${wrapperCls}-disabled-cell`;
    const selectedClass = `${wrapperCls}-selected-cell`;
    const lastMonthDayClass = `${wrapperCls}-last-month-date-cell`;
    const nextMonthDayClass = `${wrapperCls}-next-month-date-cell`;
    const today = moment();
    const firstMonthDay = value.clone().date(1);
    const dayOfWeek = firstMonthDay.day();
    const lastMonthDaysInPanel = ( 7 + dayOfWeek - value.localeData().firstDayOfWeek()) % 7;
    const firstDayInPanel = firstMonthDay.add(-lastMonthDaysInPanel, "days");
    let dateIndex = 0;
    let dateList = [];
    for(xIndex = 0; xIndex < DateConstants.DATE_ROW_COUNT; xIndex++){
      for(yIndex = 0; yIndex < DateConstants.DATE_COL_COUNT; yIndex++){
        currentDay = firstDayInPanel.clone();
        currentDay.add(dateIndex, "days");
        dateList.push(currentDay);
        dateIndex++;
      }
    }
    dateIndex = 0;
    let tbodyContent = [];
    for(xIndex = 0; xIndex < DateConstants.DATE_ROW_COUNT; xIndex++){
      let trContent = [];
      let trCls;
      for(yIndex = 0; yIndex < DateConstants.DATE_COL_COUNT; yIndex++){
        let currentDay = dateList[dateIndex];
        let cls = cellClass;
        let disabled = false;
        let selected = false;
        let isLast = this.isBeforeYearOrMonth(currentDay, value);
        let isNext = this.isAfterYearOrMonth(currentDay, value);

        if (today.isSame(currentDay, 'day')) {
          cls += ` ${nowClass}`;
        }

        if (isLast) {
          cls += ` ${lastMonthDayClass}`;
        }

        if (isNext) {
          cls += ` ${nextMonthDayClass}`;
        }

        if(disabledDate){
          if(disabledDate(currentDay, value)){
            disabled = true;
            cls += ` ${disabledClass}`;
          }
        }

        if(selectedValue){
          if(Array.isArray(selectedValue) && sectionType !== 'week'){
            const rangeValue = selectedValue.slice(0);
            if (!isLast && !isNext) {
              const startValue = rangeValue[0];
              const endValue = rangeValue[1];
              if (startValue) {
                if (currentDay.isSame(startValue, 'day')) {
                  selected = true;
                }
              }
              if (startValue && endValue) {
                if (currentDay.isSame(endValue, 'day')) {
                  selected = true;
                } else if (currentDay.isAfter(startValue, 'day') &&
                  currentDay.isBefore(endValue, 'day')) {
                  cls += ` ${rangeClass}`;
                }
              }
            }
          }else if((sectionType !== 'week') && currentDay.isSame(selectedValue, 'day')){
            selected = true;
          }
        }

        if(selected){
          cls += ` ${selectedClass}`;
        }

        trContent.push(
          <td
            className={cls}
            key={dateIndex}
            onClick={disabled ? undefined : props.onSelect.bind(null, currentDay)}
            onMouseEnter={disabled ?
              undefined : props.onDayHover && props.onDayHover.bind(null, currentDay) || undefined}
          >
            <div className={`${wrapperCls}-date`}>
              <span>{currentDay.get("date")}</span>
            </div>
          </td>
        );
        dateIndex++;
      }
      const lastDayOfWeek = dateList[dateIndex -1];
      const isLastMonth = this.isBeforeYearOrMonth(lastDayOfWeek, value)
      const isNextMonth = this.isAfterYearOrMonth(lastDayOfWeek, value)
      if(sectionType && sectionType === 'week'){
        trCls = `${wrapperCls}-section-row`;
        if(selectedValue && Array.isArray(selectedValue)){
          if(!isLastMonth && !isNextMonth){
            const startValue = selectedValue[0];
            const endValue = selectedValue[1];
            if(startValue) {
              if (lastDayOfWeek.isSame(startValue, 'week')) {
                trCls += ` ${wrapperCls}-section-selected`;
              }
            }
            if(startValue && endValue) {
              if (lastDayOfWeek.isSame(endValue, 'week')) {
                trCls += ` ${wrapperCls}-section-selected`;
              } else if (lastDayOfWeek.isAfter(startValue, 'week') &&
                lastDayOfWeek.isBefore(endValue, 'week')) {
                trCls += ` ${wrapperCls}-section-range`;
              }
            }
          }
        }else if(lastDayOfWeek && lastDayOfWeek.isSame(value, 'week')){
          trCls += ` ${wrapperCls}-section-selected`;
        }
        if(disabledDate){
          if(disabledDate(lastDayOfWeek)){
            trCls += ` ${wrapperCls}-section-disabled`;
          }
        }
      }
      tbodyContent.push(
        <tr
          role="row"
          key={xIndex}
          className={trCls}
        >
          {trContent}
        </tr>
      );
    }
    return (
      <tbody>
          {tbodyContent}
      </tbody>
    )
  }
}
