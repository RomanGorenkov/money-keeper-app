import { timeIntervalConst } from '../time-interval-const';
import { DateSwitcherConfig } from '../../interfaces/date-switcher-config.interface';
import { switcherNames } from './switcher-name';
import { SwitcherValueType } from './switcher-value-type';

const sundayIndex = 0;



function getCurrentDate() {
  return new Date().setHours(0, 0, 0, 0);
}

const timeInterval: DateSwitcherConfig[] = [
  {
    switcherPlaceholder: 'home.dateController.yourDate',
    switcherName: switcherNames.UserDate,
    startDate: 0,
    endDate: timeIntervalConst.day,
    valueType: SwitcherValueType.Date,
    customComponent: switcherNames.UserDate
  },
  {
    switcherPlaceholder: 'home.dateController.today',
    switcherName: switcherNames.Today,
    get startDate() {
      return getCurrentDate();
    },
    get endDate() {
      return getCurrentDate() + timeIntervalConst.day;
    },
    valueType: SwitcherValueType.Date
  },
  {
    switcherPlaceholder: 'home.dateController.yesterday',
    switcherName: switcherNames.Yesterday,
    get startDate() {
      return getCurrentDate() - timeIntervalConst.day;
    },
    get endDate() {
      return getCurrentDate();
    },
    valueType: SwitcherValueType.Date
  },
  {
    switcherPlaceholder: 'home.dateController.week',
    switcherName: switcherNames.Week,
    get startDate() {
      const currentDayIndex = new Date(getCurrentDate()).getDay();
      if (new Date(getCurrentDate()).getDay() === sundayIndex) {
        return getCurrentDate() - timeIntervalConst.week;
      } else {
        return getCurrentDate() - currentDayIndex * timeIntervalConst.day;
      }
    },
    endDate: getCurrentDate() + timeIntervalConst.day,
    valueType: SwitcherValueType.String
  },
  {
    switcherPlaceholder: 'home.dateController.mouth',
    switcherName: switcherNames.Mouth,
    get startDate() {
      return new Date(getCurrentDate()).setDate(1);
    },
    get endDate() {
      return getCurrentDate() + timeIntervalConst.day;
    },
    valueType: SwitcherValueType.String
  },
  {
    switcherPlaceholder: 'home.dateController.year',
    switcherName: switcherNames.Year,
    get startDate() {
      return new Date(getCurrentDate()).setFullYear(new Date().getFullYear() - 1);
    },
    get endDate() {
      return getCurrentDate() + timeIntervalConst.day;
    },
    valueType: SwitcherValueType.String
  },
  {
    switcherPlaceholder: 'home.dateController.allTime',
    switcherName: switcherNames.AllTime,
    startDate: 0,
    get endDate() {
      return getCurrentDate() + timeIntervalConst.day;
    },
    valueType: SwitcherValueType.String
  },
];


export const dateSwitcherConfig = {
  timeInterval,
  switcherNames,
};
