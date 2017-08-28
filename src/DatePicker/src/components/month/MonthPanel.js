import React from "react";
import moment from 'moment';
import { MonthConstants } from '../../constants';
import { getMonthName } from '../../utilTools';

export default class MonthPanel extends React.Component {
  constructor(props){
    super(props);
    this.selectMonth = this.selectMonth.bind(this);
  }
  getFullMonths() {
    const value = this.props.value;
    const current = value.clone();
    const fullMonths = [];
    let index = 0;
    for (let xIndex = 0; xIndex < MonthConstants.MONTH_ROW_COUNT; xIndex++) {
      fullMonths[xIndex] = [];
      for (let yIndex = 0; yIndex < MonthConstants.MONTH_COL_COUNT; yIndex++) {
        const monthItemDate = current.clone().month(index);
        const monthItemName = getMonthName(monthItemDate);
        fullMonths[xIndex][yIndex] = {
          index,
          monthName: monthItemName,
          date: monthItemDate,
        };
        index++;
      }
    }
    return fullMonths;
  }
  selectMonth(month) {
    const selected = month.clone();
    !this.props.isMonth ? this.props.onValueChange(selected) : this.props.onSelect(selected);
    !this.props.isMonth && this.props.onPanelChange('date');
  }
  render(){
    const { props } = this;
    const { wrapperCls, value, selectedValue, disabledDate, isMonth, sectionType} = props;
    const cellClass = `${wrapperCls}-column-month-cell`;
    const monthClass = `${wrapperCls}-month`;
    const rangeClass = `${wrapperCls}-range-cell`;
    const nowClass = `${wrapperCls}-now-cell`;
    const disabledClass = `${wrapperCls}-disabled-cell`;
    const selectedClass = `${wrapperCls}-selected-cell`;
    const today = moment();
    const fullMonths = this.getFullMonths();
    const monthCells = fullMonths.map((monthRow, index) => {
      const tdContent = monthRow.map((month, i) => {
        let disabled = false;
        let selected = false;
        let cls = `${cellClass} ${cellClass}-${i}`;

        if(disabledDate) {
          if(disabledDate(month.date, value)){
            disabled = true;
            cls += ` ${disabledClass}`;
          }
        }
        if(selectedValue){
          if(Array.isArray(selectedValue)){
            const rangeValue = selectedValue.slice(0);
            const startValue = rangeValue[0];
            const endValue = rangeValue[1];
            if(startValue) {
              if(month.date.isSame(startValue, 'month')) {
                selected = true;
              }
            }
            if(endValue){
              if(month.date.isSame(endValue, 'month')) {
                selected = true;
              }
            }
            if(sectionType === 'month'){
              if(endValue){
                if(month.date.isSame(startValue, 'month') ||
                  month.date.isAfter(startValue, 'month') &&
                  month.date.isBefore(endValue, 'month')
                ){
                  cls += ` ${rangeClass}`;
                }
              }
            }
          }else if(month.date.isSame(selectedValue, 'month')){
            selected = true;
          }
        }
        if(selected) {
          cls += ` ${selectedClass}`;
        }

        if( today.year() === value.year() && month.value === today.month()){
          cls += ` ${nowClass}`;
        }

        return (
          <td key={month.index} className={cls}>
            <div className={`${wrapperCls}-month-wrapper`}>
              <div
                className={`${monthClass}`}
                onClick={()=>{disabled ? undefined : this.selectMonth(month.date)}}
              >
                {month.monthName}
              </div>
            </div>
          </td>
        )
      })
      return (<tr role="row" key={index}>{tdContent}</tr>)
    });
    return (
      <table className={`${wrapperCls}-month-panel`}>
        <tbody>
          {monthCells}
        </tbody>
      </table>
    )
  }
}
