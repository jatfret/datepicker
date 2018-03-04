import React from 'react';

export default class DatePickerAdjacentSelect extends React.Component {
  render(){
    const {
      wrapperCls, value, selecteType,
      selecteEls, adjacentChange, enablePrev, enableNext
    } = this.props;
    return (
      <div className={`${wrapperCls}-adjacent-selector`}>
        <a
          role="button"
          className={`${wrapperCls}-prev-btn ${wrapperCls}-${enablePrev ? '' : 'disabled'}-btn`}
          onClick={()=>{enablePrev && adjacentChange(-1)}}
        />
        <a
          role="button"
          className={`${wrapperCls}-month-year-value`}
          onClick={selecteType ? this.props.onPanelChange.bind(null, selecteType) : undefined}
        >{selecteEls}</a>
        <a
          role="button"
          className={`${wrapperCls}-next-btn ${wrapperCls}-${enableNext ? '' : 'disabled'}-btn`}
          onClick={() => { enableNext && adjacentChange(1)}}
        />
      </div>
    )
  }
}
