import {timeIntervalConst} from './time-interval-const';
import {DateSwitcherConfig} from '../interfaces/date-switcher-config.interface';

const currentDate = new Date().setHours(0, 0, 0, 0);

const timeInterval: DateSwitcherConfig[] = [
  {
    switcherPlaceholder: 'Your date',
    switcherName: 'userDate',
    startDate: 0,
    endDate: timeIntervalConst.day,
    valueType: 'date',
    customComponent: 'userDate'

  },
  {
    switcherPlaceholder: 'Today',
    switcherName: 'today',
    startDate: currentDate,
    endDate: currentDate + timeIntervalConst.day,
    valueType: 'date'
  },
  {
    switcherPlaceholder: 'Yesterday',
    switcherName: 'yesterday',
    startDate: currentDate - timeIntervalConst.day,
    endDate: timeIntervalConst.day,
    valueType: 'date'
  },
  {
    switcherPlaceholder: 'Last week',
    switcherName: 'lastWeek',
    startDate: currentDate - timeIntervalConst.week,
    endDate: currentDate + timeIntervalConst.week,
    valueType: 'string'
  },
  {
    switcherPlaceholder: 'Last mouth',
    switcherName: 'lastMouth',
    // value: Date.now() - timeIntervalConst.month,
    startDate: new Date(new Date(currentDate).setDate(0)).setDate(1),
    endDate: currentDate + timeIntervalConst.month,
    valueType: 'string'
  },
  {
    switcherPlaceholder: 'Last year',
    switcherName: 'lastYear',
    startDate: new Date(currentDate).setFullYear(new Date().getFullYear() - 1),
    endDate: currentDate + timeIntervalConst.year,
    valueType: 'string'
  },
  {
    switcherPlaceholder: 'All time',
    switcherName: 'allTime',
    startDate: 0,
    endDate: new Date().setHours(0, 0, 0, 0),
    valueType: 'string'
  },
];



export const dateSwitcherConfig = {
  timeInterval,
};
