import React from 'react';
import moment from 'moment';
import { YearConstants } from '../../constants';

export default class YearPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.value || props.defaultValue
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.value.isSame(this.props.value, 'day')){
      this.setState({value: nextProps.value})
    }
  }
  getFullYears(){
   const value = this.state.value;
   const current = value.clone();
   const currentYear = current.year();
   const decadeStartYear = parseInt(currentYear / 10, 10) * 10;
   const firstYear = decadeStartYear - 1;
   const fullYears = [];
   let index = 0;
   for (let xIndex = 0; xIndex < YearConstants.YEAR_ROW_COUNT; xIndex++) {
     fullYears[xIndex] = [];
     for (let yIndex = 0; yIndex < YearConstants.YEAR_COL_COUNT; yIndex++) {
       const year = firstYear + index;
       fullYears[xIndex][yIndex] = {
         yearName:year,
         date: current.clone().year(year)
       };
       index++;
     }
   }
   return fullYears;
  }
  selectYear(year) {
    const value = year.clone();
    value.month(this.state.value.month());
    this.props.onValueChange(value);
    const nextPanel = this.props.isMonth ? 'month' : 'date';
    this.props.onPanelChange(nextPanel);
  }
  render(){
    const { props } = this;
    const { wrapperCls, value, disabledDate } = props;
    const cellClass = `${wrapperCls}-column-year-cell`;
    const yearClass = `${wrapperCls}-year`;
    const rangeClass = `${wrapperCls}-range-cell`;
    const nowClass = `${wrapperCls}-now-cell`;
    const disabledClass = `${wrapperCls}-disabled-cell`;
    const selectedClass = `${wrapperCls}-selected-cell`;
    const today = moment();
    const currentYear = value.year();
    const fullYears = this.getFullYears();
    const yearCells = fullYears.map((yearRow, index) => {
      const tdContent = yearRow.map((year, i) => {
        let disabled = false;
        let selected = false;
        let cls = `${cellClass} ${cellClass}-${i}`;

        if(disabledDate && disabledDate(year.date)) {
          disabled = true;
          cls += ` ${disabledClass}`;
        }

        if(year.yearName === currentYear){
          cls += ` ${selectedClass}`;
        }

        if( today.year() === value.year() && year.yearName === today.year()){
          cls += ` ${nowClass}`;
        }

        return (
          <td key={year.yearName} className={cls}>
            <div
              className={`${yearClass}`}
              onClick={disabled ? undefined : this.selectYear.bind(this, year.date)}
            >
              {year.yearName}
            </div>
          </td>
        )
      })
      return (<tr role="row" key={index}>{tdContent}</tr>)
    });
    return (
      <table className={`${wrapperCls}-year-panel`}>
        <tbody>
          {yearCells}
        </tbody>
      </table>
    )
  }
}
