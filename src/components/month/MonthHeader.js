import React from 'react';
import DatePickerAdjacentSelect from '../DatePickerAdjacentSelect';

export default class MonthHeader extends React.Component {
  constructor(props){
    super(props);
    this.goYear = this.goYear.bind(this);
  }
  goYear(direction) {
    const next = this.props.value.clone();
    next.add(direction, 'years');
    this.props.onValueChange(next);
  }
  render(){
    const { props } = this;
    const { wrapperCls, value, enablePrev, enableNext, onPanelChange } = this.props;
    const selectedYearEls = value.get('year');
    return (
      <div className={`${wrapperCls}-month-header-panel`}>
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
    )
  }
}
