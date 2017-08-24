import React from 'react';
import moment from 'moment';
import DatePickerApart from './components/DatePickerApart';
import DatePickerFooter from './components/DatePickerFooter';

function noop(){
}

function isEmptyArray(arr) {
  return Array.isArray(arr) && (arr.length === 0 || arr.every(i => !i));
}

function isArraysEqual(a, b) {
  if (a === b) {return true;}
  if (a === null || typeof a === 'undefined' || b === null || typeof b === 'undefined') {
    return false;
  }
  if (a.length !== b.length) { return false;}

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) { return false; }
  }
  return true;
}

function getValueFromSelectedValue(selectedValue) {
  const [start, end] = selectedValue;
  const newEnd = end && end.isSame(start, 'month') ? end.clone().add(1, 'month') : end;
  return [start, newEnd];
}

function normalizeAnchor(props, init) {
  const selectedValue = props.selectedValue || init && props.defaultSelectedValue;
  const value = props.value || init && props.defaultValue;
  const normalizedValue = value ?
          getValueFromSelectedValue(value) :
          getValueFromSelectedValue(selectedValue);
  return !isEmptyArray(normalizedValue) ?
    normalizedValue : init && [moment(), moment().add(1, 'months')];
}

export default class DateRangePicker extends React.Component {
  constructor(props){
    super(props);
    const selectedValue = props.selectedValue || props.defaultSelectedValue;
    this.state = {
      selectedValue: props.defaultValue || [],
      prevSelectedValue: [],
      firstSelectedValue: null,
      value: normalizeAnchor(props, 1),
      mode: props.isMonth ? ['month', 'month'] : props.mode,
    }
    this.onStartValueChange = this.onStartValueChange.bind(this);
    this.onEndValueChange = this.onEndValueChange.bind(this);
    this.onStartPanelChange = this.onStartPanelChange.bind(this);
    this.onEndPanelChange = this.onEndPanelChange.bind(this);
    this.compare = this.compare.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fireValueChange = this.fireValueChange.bind(this);
    this.fireSelectValueChange = this.fireSelectValueChange.bind(this);
  }
  onStartValueChange(leftValue) {
    const value = [...this.state.value];
    value[0] = leftValue;
    return this.fireValueChange(value);
  }
  onEndValueChange(rightValue) {
    const value = [...this.state.value];
    value[1] = rightValue;
    return this.fireValueChange(value);
  }
  onStartPanelChange(mode) {
    const { props, state } = this;
    const newMode = [mode, state.mode[1]];
    this.setState({
      mode: newMode,
    });
  }
  onEndPanelChange(mode) {
    const { props, state } = this;
    const newMode = [state.mode[0], mode];
    this.setState({
      mode: newMode,
    });
  }
  compare(v1, v2) {
    if (this.props.timePicker) {
      return v1.diff(v2);
    }
    return v1.diff(v2, 'days');
  }
  onSelect(value) {
    const { type } = this.props;
    const { selectedValue, prevSelectedValue, firstSelectedValue } = this.state;
    let nextSelectedValue;
    if (!firstSelectedValue) {
      nextSelectedValue = [value];
    } else if (this.compare(firstSelectedValue, value) < 0) {
      nextSelectedValue = [firstSelectedValue, value];
    } else {
      nextSelectedValue = [value, firstSelectedValue];
    }
    this.fireSelectValueChange(nextSelectedValue);
  }
  fireValueChange(value) {
    const props = this.props;
      this.setState({
        value,
      });
    props.onValueChange(value);
  }
  fireSelectValueChange(selectedValue) {
    const { prevSelectedValue } = this.state;

    if (!('selectedValue' in this.props)) {
      this.setState({
        selectedValue,
      });
    }
    if (selectedValue[0] && !selectedValue[1]) {
      this.setState({ firstSelectedValue: selectedValue[0] });
    }
    if (selectedValue[0] && selectedValue[1]) {
      this.setState({
        prevSelectedValue: selectedValue,
        firstSelectedValue: null,
      });
      this.props.onSelect(selectedValue);
    }
    this.props.onChange(selectedValue);
  }
  getStartValue() {
    let value = this.state.value[0];
    return value;
  }
  getEndValue() {
    const { value } = this.state;
    const endValue = value[1] ? value[1].clone() : value[0].clone().add(1, 'month');
    return endValue;
  }
  onConfirm(){
    const { selectedValue } = this.state;
    console.log(this.state)
    this.props.onConfirm(selectedValue);
  }
  onCancel(){
    const { selectedValue } = this.state;
    this.props.onCancel(selectedValue);
  }
  onChange(){

  }
  render(){
    const { state, props } = this;
    const { prefixCls, isMonth, sectionType, onSelect, disabledDate, pickerStyle } = props;
    const {
      mode, selectedValue, prevSelectedValue,
      firstSelectedValue
    } = state;
    const startValue = this.getStartValue();
    const endValue = this.getEndValue();
    const nextMonthOfStart = startValue.clone().add(1, 'months');
    const isClosestMonths = nextMonthOfStart.year() === endValue.year() &&
           nextMonthOfStart.month() === endValue.month();

    if(isMonth && endValue.isSame(startValue, 'year')){
      endValue.add(1, 'years');
    }

    return(
      <div className={`${prefixCls}-range`} style={pickerStyle}>
        <div className={`${prefixCls}-range-panel`}>
          <div className={`${prefixCls}-range-panel-left`}>
            <DatePickerApart
              prefixCls={prefixCls}
              mode={mode[0]}
              value={startValue}
              sectionType={sectionType}
              isMonth={isMonth}
              disabledDate={disabledDate}
              selectedValue={selectedValue}
              prevSelectedValue={prevSelectedValue}
              firstSelectedValue={firstSelectedValue}
              enablePrev
              enableNext={!isClosestMonths}
              onSelect={this.onSelect}
              onPanelChange={this.onStartPanelChange}
              onValueChange={this.onStartValueChange}
            />
          </div>
          <div className={`${prefixCls}-range-panel-right`}>
            <DatePickerApart
              prefixCls={prefixCls}
              mode={mode[1]}
              value={endValue}
              sectionType={sectionType}
              isMonth={isMonth}
              disabledDate={disabledDate}
              selectedValue={selectedValue}
              prevSelectedValue={prevSelectedValue}
              firstSelectedValue={firstSelectedValue}
              enablePrev={!isClosestMonths}
              enableNext
              onSelect={this.onSelect}
              onPanelChange={this.onEndPanelChange}
              onValueChange={this.onEndValueChange}
            />
          </div>
        </div>
        <DatePickerFooter
          prefixCls={prefixCls}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />
      </div>
    )
  }
}

DateRangePicker.defaultProps = {
  type: 'both',
  mode: ['date', 'date'],
  defaultSelectedValue: [],
  onValueChange: noop,
  onChange: noop,
  onSelect: noop,
}
