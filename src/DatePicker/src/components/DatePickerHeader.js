import React from 'react';
import DateHeader from './date/DateHeader';
import MonthHeader from './month/MonthHeader';
import YearHeader from './year/YearHeader';

export default class DatePickerHeader extends React.Component {
  getHeaderPanel(){
    const props = this.props;
    let { mode } = props;
    let header;
    switch(mode){
      case 'date':
        header = <DateHeader {...props}/>;
        break;
      case 'month':
        header = <MonthHeader {...props}/>;
        break;
      case 'year':
        header = <YearHeader {...props}/>;
    }
    return header;
  }
  render(){
    let { props, state } = this;
    let { wrapperCls } = props;
    return (
      <div className={`${wrapperCls}-header`}>
        {this.getHeaderPanel()}
      </div>
    )
  }
}
