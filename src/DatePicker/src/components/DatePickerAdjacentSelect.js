import React from 'react';

export default class DatePickerAdjacentSelect extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const {
      prefixCls, value, selecteType,
      selecteEls, adjacentChange, enablePrev, enableNext
    } = this.props;
    return (
      <div className={`${prefixCls}-adjacent-selector`}>
        <a
          role="button"
          className={`${prefixCls}-prev-btn ${prefixCls}-${enablePrev ? '' : 'disabled'}-btn`}
          onClick={()=>{enablePrev && adjacentChange(-1)}}
        />
        <a
          role="button"
          className={`${prefixCls}-month-year-value`}
          onClick={selecteType ? this.props.onPanelChange.bind(null, selecteType) : undefined}
        >{selecteEls}</a>
        <a
          role="button"
          className={`${prefixCls}-next-btn ${prefixCls}-${enableNext ? '' : 'disabled'}-btn`}
          onClick={() => { enableNext && adjacentChange(1)}}
        />
      </div>
    )
  }
}
