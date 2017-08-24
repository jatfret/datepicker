import React from "react";
import { YearConstants } from '../../constants';
import { getNow, isSameDay } from '../../utilTools';


export default class YearPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.value || props.defaultValue
    }
  }
  componentWillReceiveProps(nextProps){
    if(!isSameDay(nextProps.value, this.props.value)){
      this.setState({value: nextProps.value})
    }
  }
  getYears(){
   const value = this.state.value;
   const currentYear = value.year();
   const startYear = parseInt(currentYear / 10, 10) * 10;
   const previousYear = startYear - 1;
   const years = [];
   let index = 0;
   for (let rowIndex = 0; rowIndex < YearConstants.YEAR_ROW_COUNT; rowIndex++) {
     years[rowIndex] = [];
     for (let colIndex = 0; colIndex < YearConstants.YEAR_COL_COUNT; colIndex++) {
       const year = previousYear + index;
       const content = String(year);
       years[rowIndex][colIndex] = {
         content,
         year,
       };
       index++;
     }
   }
   return years;
  }
  chooseYear(year) {
    const value = this.state.value.clone();
    value.year(year);
    value.month(this.state.value.month());
    this.props.onValueChange(value);
    const nextPanel = this.props.isMonth ? 'month' : 'date';
    this.props.onPanelChange(nextPanel);
  }
  render(){
    const { props } = this;
    const { prefixCls, value, disabledDate } = props;
    const cellClass = `${prefixCls}-column-year-cell`;
    const yearClass = `${prefixCls}-year`;
    const rangeClass = `${prefixCls}-range-cell`;
    const nowClass = `${prefixCls}-now-cell`;
    const disabledClass = `${prefixCls}-disabled-cell`;
    const selectedClass = `${prefixCls}-selected-cell`;
    const today = getNow();
    const currentYear = value.year();
    const years = this.getYears();
    const yearEls = years.map((year, index) => {
      const tdContent = year.map((yearData, i) => {
        const yearTime =value.clone().year(yearData.year);
        let disabled = false;
        let selected = false;
        let cls = `${cellClass} ${cellClass}-${i}`;
        let yearEl;

        if(disabledDate && disabledDate(yearTime)) {
          disabled = true;
          cls += ` ${disabledClass}`;
        }

        if(yearData.year === currentYear){
          cls += ` ${selectedClass}`;
        }

        if( today.year() === value.year() && yearData.year === today.year()){
          cls += ` ${nowClass}`;
        }

        yearEl = <div
                    className={`${yearClass}`}
                    onClick={disabled ? undefined : this.chooseYear.bind(this, yearData.year)}
                  >
                    {yearData.content}
                  </div>
        return (<td key={yearData.year} className={cls}>{yearEl}</td>)
      })
      return (<tr role="row" key={index}>{tdContent}</tr>)
    });
    return (
      <table className={`${prefixCls}-year-panel`}>
        <tbody>
          {yearEls}
        </tbody>
      </table>
    )
  }
}
