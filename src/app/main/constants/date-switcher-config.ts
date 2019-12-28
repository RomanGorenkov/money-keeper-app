import {timeIntervalConst} from './time-interval-const';
import {DateSwitcherConfig} from '../interfaces/date-switcher-config.interface';

const timeInterval: DateSwitcherConfig[] = [
  {
    switcherPlaceholder: 'Your date',
    switcherName: 'userDate',
    value: 0,
    valueType: 'date',
    customComponent: 'userDate'
  },
  {
    switcherPlaceholder: 'Today',
    switcherName: 'today',
    value: Date.now(),
    valueType: 'date'
  },
  {
    switcherPlaceholder: 'Yesterday',
    switcherName: 'yesterday',
    value: Date.now() - timeIntervalConst.day,
    valueType: 'date'
  },
  {
    switcherPlaceholder: 'Last week',
    switcherName: 'lastWeek',
    value: Date.now() - timeIntervalConst.week,
    valueType: 'string'
  },
  {
    switcherPlaceholder: 'Last mouth',
    switcherName: 'lastMouth',
    value: Date.now() - timeIntervalConst.month,
    valueType: 'string'
  },
  {
    switcherPlaceholder: 'Last year',
    switcherName: 'lastYear',
    value: Date.now() - timeIntervalConst.year,
    valueType: 'string'
  },
  {
    switcherPlaceholder: 'All time',
    switcherName: 'allTime',
    value: 0,
    valueType: 'string'
  },
];



export const dateSwitcherConfig = {
  timeInterval,
};
