import { timeIntervalConst } from './time-interval-const';
import { DateSwitcherConfig } from '../interfaces/date-switcher-config.interface';

const sundayIndex = 0;

function getCurrentDate() {
  return new Date().setHours(0, 0, 0, 0);
}

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
    get startDate() {
      return getCurrentDate();
    },
    get endDate() {
      return getCurrentDate() + timeIntervalConst.day;
    },
    valueType: 'date'
  },
  {
    switcherPlaceholder: 'Yesterday',
    switcherName: 'yesterday',
    get startDate() {
      return getCurrentDate() - timeIntervalConst.day;
    },
    get endDate() {
      return getCurrentDate();
    },
    valueType: 'date'
  },
  {
    switcherPlaceholder: 'Week',
    switcherName: 'week',
    get startDate() {
      const currentDayIndex =  new Date(getCurrentDate()).getDay();
      if (new Date(getCurrentDate()).getDay() === sundayIndex) {
        return getCurrentDate() - timeIntervalConst.week;
      } else {
        return getCurrentDate() - currentDayIndex * timeIntervalConst.day;
      }
    },
    endDate: getCurrentDate() + timeIntervalConst.day,
    valueType: 'string'
  },
  {
    switcherPlaceholder: 'Mouth',
    switcherName: 'mouth',
    get startDate() {
      return new Date(getCurrentDate()).setDate(1);
    },
    get endDate() {
      return getCurrentDate() + timeIntervalConst.day;
    },
    valueType: 'string'
  },
  {
    switcherPlaceholder: 'Year',
    switcherName: 'year',
    get startDate() {
      return new Date(getCurrentDate()).setFullYear(new Date().getFullYear() - 1);
    },
    get endDate() {
      return getCurrentDate() + timeIntervalConst.day;
    },
    valueType: 'string'
  },
  {
    switcherPlaceholder: 'All time',
    switcherName: 'allTime',
    startDate: 0,
    get endDate() {
      return getCurrentDate() + timeIntervalConst.day;
    },
    valueType: 'string'
  },
];


export const dateSwitcherConfig = {
  timeInterval,
};
