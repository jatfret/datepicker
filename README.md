datepicker 为一款基于 React + Moment.js 的时间选择器，分别支持日、周、月、年维度的单选和区间选择。查看[demo](http://demo.jatfret.com/datepickerDemo/index.html "jatfret")


## API说明
| 参数             | 说明               | 类型              | 默认值          |
|--------------|----------------|----------|--------------|
| value           | 展示日期            | [moment](http://momentjs.com)|当前日期|
| isRange         | 是否为时间段选择     | Boolean           | false           |
| isMonth         | 选择月份            | Boolean          | false          |
| sectionType     | 截面选择            | String           | "date"  |        
| defaultValue    | 默认日期            | [moment](http://momentjs.com)| undefined |
| disableDate     | 不可选择时间          | Function(current:moment):Boolean | undefined|
| inputClassName  | 输入框的class名称    | String           | undefined        |
| onConfrim       | 确认回调函数         | Function          | undefinded      |
| onSelect        | 选择日期回调函数      | Function          | undefined        |

## 需要安装的依赖：
  - React
  - Moment.js
  - sass
