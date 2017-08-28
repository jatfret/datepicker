import React from 'react';
import DatePickerHeader from './DatePickerHeader';
import DatePickerTable from './DatePickerTable';

export default class DatePickerApart extends React.Component {

  render(){
    const props = this.props;
    const {
      wrapperCls, value, selectedValue,disabledDate, mode, isMonth,
      sectionType, isRange, setValue, enablePrev, enableNext, onSelect, onValueChange,
      onPanelChange
     } = props;
    return (
      <div className={`${wrapperCls}-panel`}>
        <DatePickerHeader
          wrapperCls={wrapperCls}
          value={value}
          mode={mode}
          isMonth={isMonth}
          sectionType={sectionType}
          isRange={isRange}
          enablePrev={enablePrev}
          enableNext={enableNext}
          onSelect={onSelect}
          onValueChange={onValueChange}
          onPanelChange={onPanelChange}
        />
        <DatePickerTable
          wrapperCls={wrapperCls}
          value={value}
          selectedValue={selectedValue}
          disabledDate={disabledDate}
          mode={mode}
          isMonth={isMonth}
          sectionType={sectionType}
          isRange={isRange}
          onSelect={onSelect}
          onValueChange={onValueChange}
          onPanelChange={onPanelChange}
        />
      </div>
    )
  }
}
