import moment from 'moment';
import { DEFAULT_FORMAT } from '../constants';

export function getNow(value){
  const today = moment();
  return today;
}
export function isSameDay(date1, date2){
  return date1 && date2 && date1.isSame(date2, 'day');
}

export function isSameWeek(date1, date2){
  return date1 && date2 && date1.isSame(date2, 'week');
}

export function getMonthName(month) {
  const locale = month.locale();
  const localeData = month.localeData();
  return localeData[locale === 'zh-cn' ? 'months' : 'monthsShort'](month);
}
