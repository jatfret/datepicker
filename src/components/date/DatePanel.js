import React from 'react';
import DateTHead from './DateTHead';
import DateTBody from './DateTBody';

export default class DatePanel extends React.Component {
  render(){
    const props = this.props;
    const { wrapperCls } = props;
    return (
      <table className={`${wrapperCls}-date-panel`}>
        <DateTHead {...props}/>
        <DateTBody {...props}/>
      </table>
    )
  }
}
