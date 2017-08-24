import React from 'react';
import { DateConstants } from '../../constants';
import { getNow, isSameDay, isSameWeek } from '../../utilTools';

export default class DateTBody extends React.Component {
  constructor(props){
    super(props);
  }

  isBeforeMonthYear(date1, date2){
    if(date1.year() < date2.year()){
      return true;
    }
    return date1.year() === date2.year() && date1.month() < date2.month();
  }
  isAfterMonthYear(date1, date2){
    if(date1.year() > date2.year()){
      return true;
    }
    return date1.year() === date2.year() && date1.month() > date2.month();
  }
  render(){
    const props = this.props;
    const { prefixCls, value, selectedValue, sectionType, isRange, disabledDate } = props;
    let currentDay;
    let xIndex;
    let yIndex;
    const sectionRowClass = `${prefixCls}-section-row`;
    const sectionSelectedClass = `${prefixCls}-section-selected`;
    const cellClass = `${prefixCls}-column-date-cell`;
    const rangeClass = `${prefixCls}-range-cell`;
    const dateClass = `${prefixCls}-date`;
    const nowClass = `${prefixCls}-now`;
    const disabledClass = `${prefixCls}-disabled-cell`;
    const selectedClass = `${prefixCls}-selected-cell`;
    const lastMonthDayClass = `${prefixCls}-last-month-date-cell`;
    const nextMonthDayClass = `${prefixCls}-next-month-date-cell`;
    const today = getNow();
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
        let isLast = this.isBeforeMonthYear(currentDay, value);
        let isNext = this.isAfterMonthYear(currentDay, value);

        if (isSameDay(currentDay, today)) {
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

        if(selectedValue && Array.isArray(selectedValue) && sectionType !== 'week'){
          const rangeValue = selectedValue;
          if (!isLast && !isNext) {
            const startValue = rangeValue[0];
            const endValue = rangeValue[1];
            if (startValue) {
              if (isSameDay(currentDay, startValue)) {
                selected = true;
              }
            }
            if (startValue && endValue) {
              if (isSameDay(currentDay, endValue)) {
                selected = true;
              } else if (currentDay.isAfter(startValue, 'day') &&
                currentDay.isBefore(endValue, 'day')) {
                cls += ` ${rangeClass}`;
              }
            }
          }
        }else if((sectionType !== 'week') && currentDay.isSame(value, 'day')){
          selected = true;
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
            <div className={`${prefixCls}-date`}>
              <span>{currentDay.get("date")}</span>
            </div>
          </td>
        );
        dateIndex++;
      }
      const lastDayOfWeek = dateList[dateIndex -1];
      const isLastMonth = this.isBeforeMonthYear(lastDayOfWeek, value)
      const isNextMonth = this.isAfterMonthYear(lastDayOfWeek, value)
      if(sectionType && sectionType === 'week'){
        trCls = `${prefixCls}-section-row`;
        if(selectedValue && Array.isArray(selectedValue)){
          if(!isLastMonth && !isNextMonth){
            const startValue = selectedValue[0];
            const endValue = selectedValue[1];
            if (startValue) {
              if (isSameWeek(lastDayOfWeek, startValue)) {
                trCls += ` ${prefixCls}-section-selected`;
              }
            }
            if (startValue && endValue) {
              if (isSameWeek(lastDayOfWeek, endValue)) {
                trCls += ` ${prefixCls}-section-selected`;
              } else if (lastDayOfWeek.isAfter(startValue, 'week') &&
                lastDayOfWeek.isBefore(endValue, 'week')) {
                trCls += ` ${prefixCls}-section-range`;
              }
            }
          }
        }else if(lastDayOfWeek && isSameWeek(lastDayOfWeek, value)){
          trCls += ` ${prefixCls}-section-selected`;
        }
        if(disabledDate){
          if(disabledDate(lastDayOfWeek)){
            trCls += ` ${prefixCls}-section-disabled`;
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
