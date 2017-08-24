import React from 'react';

export default class DatePickerFooter extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const { props } = this;
    const { prefixCls, onCancel, onConfirm } = props;
    return (
      <div className={`${prefixCls}-footer`}>
        <a
          className={`${prefixCls}-cancel-btn`}
          onClick={onCancel}
        >
          取消
        </a>
        <a
          className={`${prefixCls}-confirm-btn`}
          onClick={onConfirm}
        >
          确认
        </a>
      </div>
    )
  }
}
