import React from 'react';
import DateTHead from './DateTHead';
import DateTBody from './DateTBody';

export default class DatePanel extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const props = this.props;
    const { prefixCls } = props;
    return (
      <table className={`${prefixCls}-date-panel`}>
        <DateTHead {...props}/>
        <DateTBody {...props}/>
      </table>
    )
  }
}
