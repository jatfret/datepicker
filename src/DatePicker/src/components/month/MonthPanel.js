import React from "react";
import { MonthConstants } from '../../constants';
import { getNow, getMonthName, isSameWeek } from '../../utilTools';

export default class MonthPanel extends React.Component {
  constructor(props){
    super(props);
    this.chooseMonth = this.chooseMonth.bind(this);
    // this.setAndSelectValue = this.setAndSelectValue.bind(this);
  }
  getMonths() {
    const value = this.props.value;
    const current = value.clone();
    const months = [];
    let index = 0;
    for (let rowIndex = 0; rowIndex < MonthConstants.MONTH_ROW_COUNT; rowIndex++) {
      months[rowIndex] = [];
      for (let colIndex = 0; colIndex < MonthConstants.MONTH_COL_COUNT; colIndex++) {
        current.month(index);
        const content = getMonthName(current);
        months[rowIndex][colIndex] = {
          value: index,
          content,
        };
        index++;
      }
    }
    return months;
  }
  chooseMonth(month) {
    const next = this.props.value.clone();
    next.month(month);
    !this.props.isMonth ? this.props.onValueChange(next) : this.props.onSelect(next);
    !this.props.isMonth && this.props.onPanelChange('date');
  }
  render(){
    const { props } = this;
    const { prefixCls, value, selectedValue, disabledDate, isMonth} = props;
    const cellClass = `${prefixCls}-column-month-cell`;
    const monthClass = `${prefixCls}-month`;
    const rangeClass = `${prefixCls}-range-cell`;
    const nowClass = `${prefixCls}-now-cell`;
    const disabledClass = `${prefixCls}-disabled-cell`;
    const selectedClass = `${prefixCls}-selected-cell`;
    const today = getNow();
    const currentMonth = value.month();
    const months = this.getMonths();
    const monthEls = months.map((month, index) => {
      const tdContent = month.map((monthData, i) => {
        const monthDate = value.clone().month(monthData.value);
        let disabled = false;
        let selected = false;
        let cls = `${cellClass} ${cellClass}-${i}`;
        let monthEl;

        if(disabledDate) {
          // debugger;
          if(disabledDate(monthDate, value)){
            disabled = true;
            cls += ` ${disabledClass}`;
          }
        }
        if(selectedValue && Array.isArray(selectedValue) && isMonth){
          const rangeValue = selectedValue;
          const startValue = rangeValue[0];
          const endValue = rangeValue[1];
          if (startValue) {
            if (isSameWeek(monthDate, startValue)) {
              selected = true;
            }
          }
          if (startValue && endValue) {
            if (isSameWeek(monthDate, startValue) ) {
              selected = true;
              cls += ` ${rangeClass}`;
            }else if(isSameWeek(monthDate, endValue)){
              selected = true;
            }else if (monthDate.isAfter(startValue, 'month') &&
              monthDate.isBefore(endValue, 'month')) {
              cls += ` ${rangeClass}`;
            }
          }
        }else if(monthData.value === currentMonth){
          selected = true;
        }
        if(selected) {
          cls += ` ${selectedClass}`;
        }

        if( today.year() === value.year() && monthData.value === today.month()){
          cls += ` ${nowClass}`;
        }

        monthEl = <div className={`${prefixCls}-month-wrapper`}>
                    <div
                      className={`${monthClass}`}
                      onClick={()=>{disabled ? undefined : this.chooseMonth(monthData.value)}}
                    >
                      {monthData.content}
                    </div>
                  </div>
        return (<td key={monthData.value} className={cls}>{monthEl}</td>)
      })
      return (<tr role="row" key={index}>{tdContent}</tr>)
    });
    return (
      <table className={`${prefixCls}-month-panel`}>
        <tbody>
          {monthEls}
        </tbody>
      </table>
    )
  }
}
