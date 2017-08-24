import React from 'react';
import DatePanel from './date/DatePanel';
import MonthPanel from './month/MonthPanel';
import YearPanel from './year/YearPanel';

export default class DatePickerTable extends React.Component {
  constructor(props){
    super(props);
  }
  getTablePanel(){
    const props = this.props;
    let { mode } = props;
    let table;
    switch(mode){
      case 'date':
        table = <DatePanel {...props}/>;
        break;
      case 'month':
        table = <MonthPanel {...props}/>;
        break;
      case 'year':
        table = <YearPanel {...props}/>;
    }
    return table;
  }
  render(){
    const props = this.props;
    const { prefixCls, mode } = props;
    return (
      <div className={`${prefixCls}-body`}>
        {this.getTablePanel(props)}
      </div>
    )
  }
}
