import React from 'react';
import DatePickerAdjacentSelect from '../DatePickerAdjacentSelect';

export default class YearHeader extends React.Component {
  constructor(props){
    super(props);
    this.goYear = this.goYear.bind(this);
  }
  goYear(direction) {
    const next = this.props.value.clone();
    next.add(direction * 10, 'years');
    this.props.onValueChange(next);
  }
  render(){
    const { props } = this;
    const { prefixCls, value, enablePrev, enableNext, } = this.props;
    const currentYear = value.year();
    const startYear = parseInt(currentYear / 10, 10) * 10;
    const endYear = startYear + 9;
    const previousYear = startYear - 1;
    const selectedEls =  `${startYear}-${endYear}`;
    return (
      <div className={`${prefixCls}-year-header-panel`}>
        <DatePickerAdjacentSelect
          prefixCls={prefixCls}
          selecteEls={selectedEls}
          enablePrev={enablePrev}
          enableNext={enableNext}
          adjacentChange={this.goYear}
        />
      </div>
    )
  }
}
