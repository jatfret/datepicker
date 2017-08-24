const DateConstants = {
  DATE_COL_COUNT: 7,
  DATE_ROW_COUNT: 6,
}
const MonthConstants = {
  MONTH_COL_COUNT: 3,
  MONTH_ROW_COUNT: 4,
}
const YearConstants = {
  YEAR_COL_COUNT: 3,
  YEAR_ROW_COUNT: 4,
}
const OPTIONS = {
  mode: 'date', //month, year 时间选择面板
  isSection: false, //是否是截面
  isRange: false, //是否是时间段选择
}

const DefaultFormat = "YYYY.MM.DD";

export { DateConstants, MonthConstants, YearConstants, OPTIONS, DefaultFormat } ;
