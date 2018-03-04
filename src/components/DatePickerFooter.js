import React from 'react';

export default class DatePickerFooter extends React.Component {
  render(){
    const { props } = this;
    const { wrapperCls, onCancel, onConfirm } = props;
    return (
      <div className={`${wrapperCls}-footer`}>
        <a
          className={`${wrapperCls}-cancel-btn`}
          onClick={onCancel}
        >
          取消
        </a>
        <a
          className={`${wrapperCls}-confirm-btn`}
          onClick={onConfirm}
        >
          确认
        </a>
      </div>
    )
  }
}
