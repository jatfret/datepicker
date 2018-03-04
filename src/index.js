import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './index.css';
import App from './App';
import DatePicker from './DatePicker';
import registerServiceWorker from './registerServiceWorker';

moment.locale("zh-cn");

class Test extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      singleType: 'day',
      rangeType: 'day'
    }
    this.onSetSingle = this.onSetSingle.bind(this);
    this.onSetRange = this.onSetRange.bind(this);
  }
  onSetSingle(e){
    this.setState({
      singleType: e.target.value
    })
  }
  onSetRange(e){
    this.setState({
      rangeType: e.target.value
    })
  }
  render(){
    const singleProps = {
      isMonth: this.state.singleType === 'month',
      sectionType: this.state.singleType
    }
    const rangeProps = {
      isRange: true,
      isMonth: this.state.rangeType === 'month',
      sectionType: this.state.rangeType
    }
    return (
      <div className="datepicker-wrapper">
        <p>基于 React + Moment 实现的一个时间选择器，分别支持日、周、月、年维度的单选和区间选择</p>
        <p>源码地址：<a href="http://www.github.com/jatfret/datepicker" target="blank">www.github.com/jatfret/datepicker</a></p>
        <section className="single-picker">
          <h3>单选</h3>
          <DatePicker {...singleProps}/>
          <div className="section-choose">
            维度：
            <label htmlFor="day">
              <input
                name="single-section"
                id="day"
                type="radio"
                value="day"
                checked={this.state.singleType === 'day'}
                onChange={this.onSetSingle}
              />
              day
            </label>
            <label htmlFor="week">
              <input
                name="single-section"
                id="week"
                type="radio"
                value="week"
                checked={this.state.singleType === 'week'}
                onChange={this.onSetSingle}
              />
              week
            </label>
            <label htmlFor="month">
              <input
                name="single-section"
                id="month"
                type="radio"
                value="month"
                checked={this.state.singleType === 'month'}
                onChange={this.onSetSingle}
              />
              month
            </label>
          </div>
        </section>
        <section className="range-picker">
          <h3>区间选择</h3>
          <DatePicker {...rangeProps}/>
          <div className="section-choose">
            维度：
            <label htmlFor="day-section">
              <input
                name="range-section"
                id="day-section"
                type="radio"
                value="day"
                checked={this.state.rangeType === 'day'}
                onChange={this.onSetRange}
              />
              day
            </label>
            <label htmlFor="week-section">
              <input
                name="range-section"
                id="week-section"
                type="radio"
                value="week"
                checked={this.state.rangeType === 'week'}
                onChange={this.onSetRange}
              />
              week
            </label>
            <label htmlFor="month-section">
              <input
                name="range-section"
                id="month-section"
                type="radio"
                value="month"
                checked={this.state.rangeType === 'month'}
                onChange={this.onSetRange}
              />
              month
            </label>
          </div>
        </section>
      </div>
    )
  }
}

ReactDOM.render(<Test />, document.getElementById('root'));
registerServiceWorker();
