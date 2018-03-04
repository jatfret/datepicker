import React from 'react';
import moment from 'moment';
import DatePickerApart from './components/DatePickerApart';
import DatePickerFooter from './components/DatePickerFooter';
import '../scss/index.scss';
import { DefaultFormat } from './constants';

export class SingleDatePicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      wrapperCls: props.wrapperCls,
      value: props.value || props.defaultValue || moment(),
      selectedValue: props.defaultValue || null,
      firstSelectedValue: null,
      disableDate: props.disableDate || null,
      mode: props.isMonth ? 'month' : 'date',
      isMonth: props.isMonth || false,
      sectionType: props.sectionType || null,
      isRange: props.isRange || false,
    }
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onPanelChange = this.onPanelChange.bind(this);
    this.setValue = this.setValue.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if('mode' in nextProps && this.state.mode !== nextProps.mode) {
      this.setState({ mode: nextProps.mode });
    }
  }
  onCancel(){
    const { selectedValue } = this.state;
    this.props.onCancel(selectedValue);
  }
  onConfirm(){
    const { selectedValue } = this.state;
    this.props.onConfirm(selectedValue);
  }
  onSelect(value){
    if (value) {
      this.setValue(value);
    }
    this.setSelectedValue(value);
  }
  onPanelChange(mode){
    this.setState({mode})
  }
  setValue(value){
    const originalValue = this.state.value;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    if (
      originalValue && value && !originalValue.isSame(value) ||
        (!originalValue && value) ||
        (originalValue && !value)
    ) {
      this.props.onChange(value);
    }
  }
  setSelectedValue(selectedValue){
    if (!('selectedValue' in this.props)) {
      this.setState({
        selectedValue,
      });
    }
    this.props.onSelect(selectedValue);
  }
  render(){
    const { props, state } = this;
    const { format, sectionType, disabledDate, pickerStyle } = props;
    const { wrapperCls, value, selectedValue, mode, isMonth, isRange } = state;
    return (
      <div className={`${wrapperCls}`} style={pickerStyle}>
        <DatePickerApart
          wrapperCls={wrapperCls}
          value={value}
          selectedValue={selectedValue}
          disabledDate={disabledDate}
          mode={mode}
          isMonth={isMonth}
          sectionType={sectionType}
          isRange={isRange}
          enablePrev
          enableNext
          setValue={this.setValue}
          onSelect={this.onSelect}
          onValueChange={this.setValue}
          onPanelChange={this.onPanelChange}
        />
        <DatePickerFooter
          wrapperCls={wrapperCls}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />
      </div>
    )
  }
}

SingleDatePicker.defaultProps = {
  format: DefaultFormat,
  onPanelChange(){},
  onConfirm(){},
  onCancel(){},
  onSelect(){},
  onChange(){}
}

export default SingleDatePicker
