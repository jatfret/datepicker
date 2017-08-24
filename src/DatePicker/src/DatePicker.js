import React from 'react';
import DatePickerApart from './components/DatePickerApart';
import DatePickerFooter from './components/DatePickerFooter';
import DateRangePicker from "./DateRangePicker";
import '../scss/index.scss';
import { getNow } from './utilTools';
import { DefaultFormat } from './constants';


 const prefixCls = "datepicker";

function noop(){

}

export class DatePicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      prefixCls: prefixCls,
      value: props.value || props.defaultValue || getNow(),
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
    // console.log(this.state)
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
    const {
      prefixCls, value, selectedValue, mode, isMonth, isRange
    } = state;
    return (
      <div className={`${prefixCls}`} style={pickerStyle}>
        <DatePickerApart
          prefixCls={prefixCls}
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
          prefixCls={prefixCls}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />
      </div>
    )
  }
}

DatePicker.defaultProps = {
  format: DefaultFormat,
  onPanelChange: noop,
  onConfirm: noop,
  onCancel: noop,
  onSelect: noop,
  onChange: noop
}

export default DatePicker
