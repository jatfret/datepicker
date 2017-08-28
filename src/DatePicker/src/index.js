import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import SingleDatePicker from './SingleDatePicker';
import RangeDatePicker from './RangeDatePicker';
const wrapperCls = "datepicker";

moment.locale('zh-cn');

class DatePickerComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
      prevValue: props.defaultValue,
      pickerStyle: {
        position: 'absolute',
      }
    }
    this.onInputHandler = this.onInputHandler.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillUnmount(){
    this.removeDatePickerComponent();
    if(this.node){
      this.node.ParentNode.removeChild(this.node);
    }
  }
  handleClick(e){
    if(this.node && this.DatePicker){
      const pickerDOM = ReactDOM.findDOMNode(this.DatePicker);
      if(!pickerDOM.contains(e.target) && e.target !== pickerDOM ){
        this.removeDatePickerComponent();
      }
    }
  }
  renderDatePickerComponent(){
    const { state, props } = this;

    if (!this.node) {
      this.node = document.createElement('div');
      this.node.classList.add(`${wrapperCls}-popup`)
      document.body.appendChild(this.node);
    }

    const instance = props.isRange ? <RangeDatePicker /> : <SingleDatePicker />;
    const newProps = Object.assign({}, props, {
      wrapperCls: wrapperCls,
      pickerStyle: this.getPickerStyle(),
      defaultValue: state.prevValue,
      onSelect: this.onSelect,
      onChange: this.onChange,
      onConfirm: this.onConfirm,
      onCancel: this.onCancel,
    })
    const datepicker = React.cloneElement(instance, newProps);
    this.DatePicker = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      datepicker,
      this.node,
    );
  }
  removeDatePickerComponent(){
    if(this.node){
      ReactDOM.unmountComponentAtNode(this.node);
      this.DatePicker = null;
    }
  }
  onSelect(value){
    this.setState({value});
    this.props.onSelect(value);
  }
  onChange(value){
    this.props.onChange(value);
  }
  onConfirm(value){
    console.log(value)
    if(value){
      const prevValue = this.state.prevValue;
      const validValue = value || prevValue;
      this.setState({value: validValue, prevValue: validValue});
      this.props.onConfirm(validValue);
    }
    this.removeDatePickerComponent();
  }
  onCancel(value){
    const { prevValue } = this.state;
    this.setState({value: prevValue});
    this.removeDatePickerComponent();
  }
  getFormatDate(date){
    const { format, isMonth, sectionType, isRange } = this.props;
    if(isRange){
      if(isMonth){
        return date.clone().startOf("month").format(format);
      }
      if(sectionType === 'week'){
        return date.clone().startOf("week").format(format)
      }
    }else{
      if(isMonth){
        return `${date.clone().startOf("month").format(format)}~${date.clone().endOf("month").format(format)}`;
      }
      if(sectionType === 'week'){
        return `${date.clone().startOf("week").format(format)}~${date.clone().endOf("week").format(format)}`;
      }
    }
    return date.format(format);
  }
  getInputValue(){
    const { state, props } = this;
    const { isRange, isMonth, sectionType} = props;
    const { value } = state;
    let inputStr;
    if(value){
      if(Array.isArray(value)){
        const startValue = value[0];
        const endValue = value[1];
        if(startValue && endValue){
          inputStr = this.getFormatDate(startValue) + `~` + this.getFormatDate(endValue);
        }
        return inputStr;
      }else {
        inputStr = this.getFormatDate(value);
      }
    }
    return inputStr;
  }
  getPickerStyle(){
    const inputPos = this.datepickerInput.getBoundingClientRect();
    const pickerPos = {
      top: inputPos.top + inputPos.height + document.body.scrollTop + 'px',
      left: inputPos.left + document.body.scrollLeft + 'px',
    }
    return {
      position: 'absolute',
      top: pickerPos.top,
      left: pickerPos.left,
    }
  }
  onInputHandler(e){
    e.stopPropagation();
    this.renderDatePickerComponent();
  }
  render(){
    const { state, props } = this;
    const { isRange, inputClassName, style } = props;
    const { value } = state;
    return (
       <input
         readOnly
         ref={(datepickerInput)=>{this.datepickerInput = datepickerInput}}
         className={`datePicker-input ${inputClassName}`}
         style={style}
         value={value && this.getInputValue() || ''}
         placeholder="请选择时间"
         onClick={this.onInputHandler}
       />
    )
  }
}
DatePickerComponent.defaultProps = {
  onChange(){},
  onSelect(){},
  onConfirm(){},
  onCancel(){},
  format: 'YYYY.MM.DD'
}
export default DatePickerComponent;
