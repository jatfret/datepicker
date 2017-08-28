import React from 'react';
import DatePickerAdjacentSelect from '../DatePickerAdjacentSelect';
import { getMonthName } from '../../utilTools';

export default class DateHeader extends React.Component {
  constructor(props){
    super(props);
    this.goMonth = this.goMonth.bind(this);
    this.goYear = this.goYear.bind(this);
  }
  goMonth(direction) {
    const next = this.props.value.clone();
    next.add(direction, 'months');
    this.props.onValueChange(next);
  }
  goYear(direction) {
    const next = this.props.value.clone();
    next.add(direction, 'years');
    this.props.onValueChange(next);
  }
  render(){
    const { props } = this;
    const { wrapperCls, value, enableNext, enablePrev, onPanelChange } = this.props;
    const selectedYearEls = value.get('year');
    const selectedMonthEls = getMonthName(value);
    return (
      <div className={`${wrapperCls}-date-header-panel`}>
        <div className={`${wrapperCls}-col2`}>
          <DatePickerAdjacentSelect
            wrapperCls={wrapperCls}
            selecteType={"year"}
            selecteEls={selectedYearEls}
            enablePrev={enablePrev}
            enableNext={enableNext}
            adjacentChange={this.goYear}
            onPanelChange={onPanelChange}
          />
        </div>
        <div className={`${wrapperCls}-col2`}>
          <DatePickerAdjacentSelect
          wrapperCls={wrapperCls}
          selecteType={"month"}
          selecteEls={selectedMonthEls}
          enablePrev={enablePrev}
          enableNext={enableNext}
          adjacentChange={this.goMonth}
          onPanelChange={onPanelChange}
          />
        </div>
      </div>
    )
  }
}
