import { isFirefoxBelow53 } from './BrowserVersion';

export const getCalendarGridClassName = () => {
  let firefoxBelow35 = isFirefoxBelow53();
  if (firefoxBelow35) {
    return 'calendarGridFirefoxBelow35';
  } else {
    return 'calendarGrid';
  }
};

export const getCalendarGridHeaderClassName = () => {
  let firefoxBelow35 = isFirefoxBelow53();
  if (firefoxBelow35) {
    return 'calendarGridHeaderFirefoxBelow35';
  } else {
    return;
  }
};

export const getCalendarGridCellClassName = () => {
  let firefoxBelow35 = isFirefoxBelow53();
  if (firefoxBelow35) {
    return 'calendarCellFirefoxBelow35';
  } else {
    return 'calendarCell';
  }
};
