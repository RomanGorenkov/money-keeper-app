import { DateSwitcherConfig } from '../../interfaces/date-switcher-config.interface';
import { timeIntervalConst } from '../time-interval-const';
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
    valueType: SwitcherValueType.DATE,
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
    valueType: SwitcherValueType.DATE
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
    valueType: SwitcherValueType.DATE
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
    valueType: SwitcherValueType.STRING
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
    valueType: SwitcherValueType.STRING
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
    valueType: SwitcherValueType.STRING
  },
  {
    switcherPlaceholder: 'home.dateController.allTime',
    switcherName: switcherNames.AllTime,
    startDate: 0,
    get endDate() {
      return getCurrentDate() + timeIntervalConst.day;
    },
    valueType: SwitcherValueType.STRING
  },
];


export const dateSwitcherConfig = {
  timeInterval,
  switcherNames,
  indexOfTodaySwitcher: 1,
  indexOfCustomSwitcher: 0,
};
