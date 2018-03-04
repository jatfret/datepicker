import React from 'react';
import moment from 'moment';
import DatePickerApart from './components/DatePickerApart';
import DatePickerFooter from './components/DatePickerFooter';

export default class RangeDatePicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedValue: props.defaultValue || null,
      prevSelectedValue: [],
      firstSelectedValue: null,
      value: props.value,
      mode: props.isMonth ? ['month', 'month'] : props.mode,
    }
    this.onStartValueChange = this.onStartValueChange.bind(this);
    this.onEndValueChange = this.onEndValueChange.bind(this);
    this.onStartPanelChange = this.onStartPanelChange.bind(this);
    this.onEndPanelChange = this.onEndPanelChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setValueChange = this.setValueChange.bind(this);
    this.onSelectValueChange = this.onSelectValueChange.bind(this);
  }
  onStartValueChange(leftValue) {
    const value = [...this.state.value];
    value[0] = leftValue;
    return this.setValueChange(value);
  }
  onEndValueChange(rightValue) {
    const value = [...this.state.value];
    value[1] = rightValue;
    return this.setValueChange(value);
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
  onSelect(value) {
    const { selectedValue, prevSelectedValue, firstSelectedValue } = this.state;
    let nextSelectedValue;
    if (!firstSelectedValue) {
      nextSelectedValue = [value];
    } else if (firstSelectedValue.diff(value, 'days') < 0) {
      nextSelectedValue = [firstSelectedValue, value];
    } else {
      nextSelectedValue = [value, firstSelectedValue];
    }
    this.onSelectValueChange(nextSelectedValue);
  }
  setValueChange(value) {
    const props = this.props;
      this.setState({
        value,
      });
    props.onValueChange(value);
  }
  onSelectValueChange(selectedValue) {
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
    const { wrapperCls, isMonth, sectionType, onSelect, disabledDate, pickerStyle } = props;
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
      <div className={`${wrapperCls}-range`} style={pickerStyle}>
        <div className={`${wrapperCls}-range-panel`}>
          <div className={`${wrapperCls}-range-panel-left`}>
            <DatePickerApart
              wrapperCls={wrapperCls}
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
          <div className={`${wrapperCls}-range-panel-right`}>
            <DatePickerApart
              wrapperCls={wrapperCls}
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
          wrapperCls={wrapperCls}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />
      </div>
    )
  }
}

RangeDatePicker.defaultProps = {
  mode: ['date', 'date'],
  value: [moment(), moment().add(1, 'months')],
  defaultValue: null,
  onValueChange(){},
  onChange(){},
  onSelect(){},
}
