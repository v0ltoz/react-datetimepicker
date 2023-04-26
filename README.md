# 📦 React Tailwindcss Date-Time Picker

This is a feature rich React date-time picker component which supports:

    1. Selecting a date range from calendar
    2. Selecting time for both start and end of the range
    3. Defining custom range presets for quicker access
    4. keyboard accessibility - Arrow key and Tab navigation

It's a fork of [react-datetimepicker](https://github.com/v0ltoz/react-datetimepicker) but completely re-written with React 18 (Can be used in strict mode), [Tailwindcss](https://tailwindcss.com/) and build with blazing fast [Vitejs](https://vitejs.dev/).

<a href="https://github.com/microsoft/react-native-macos/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="React Native for macOS is released under the MIT license." />
  </a>
<a href="https://www.npmjs.com/package/raygun-sourcemap-webpack-plugin">
    <img src="https://img.shields.io/npm/dm/raygun-sourcemap-webpack-plugin.svg?style=flat-square" alt="Downloads" />
</a>

## Online Demo

**See a working demo at codesandbox.io**
It will work with React Version 18+

https://codesandbox.io/p/github/mohsentaleb/react-tailwindcss-datetimepicker/master

![Date Time Picker](https://raw.githubusercontent.com/mohsentaleb/react-tailwindcss-datetimepicker/master/public/date-picker-screenshot.png)

## Table of Contents

- [Online Demo](#online-demo)
- [Setup](#setup)
- [Component Props](#component-props)
- [Basic Usage](#basic-usage)
- [Development](#development)
- [Roadmap](#roadmap)
- [License](#license)

## Setup

Install via npm:

```bash
npm i react-tailwindcss-datetimepicker
```

or Yarn

```bash
yarn add react-tailwindcss-datetimepicker
```

### With TailwindCSS

If you're already including TailwindCSS in your project, just open up your `tailwind.config.js` file and add the following line to your `content` directive so that tailwind could find CSS classes used in picker and add those to your project's global css file:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datetimepicker/dist/react-tailwindcss-datetimepicker.js', // <-- This line
    // ...
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Without TailwindCSS



## Basic Usage

```js
import React from 'react';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';
import moment from 'moment';

function App() {
  const now = new Date();
  const start = moment(
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
  );
  const end = moment(start).add(1, 'days').subtract(1, 'seconds');
  const [range, setRange] = useState({
    start: start,
    end: end,
  });
  const ranges = {
    'Today': [moment(start), moment(end)],
    'Yesterday': [
      moment(start).subtract(1, 'days'),
      moment(end).subtract(1, 'days'),
    ],
    '3 Days': [moment(start).subtract(3, 'days'), moment(end)],
    '2 Weeks': [moment(start).subtract(14, 'days'), moment(end)],
    '1 Month': [moment(start).subtract(1, 'months'), moment(end)],
    '1st August 18': [
      moment('2018-08-01 00:00:00'),
      moment('2018-08-02 23:59:59'),
    ],
    '1 Year': [moment(start).subtract(1, 'years'), moment(end)],
  };
  const local = {
    format: 'DD-MM-YYYY HH:mm',
    sundayFirst: false,
  };
  const maxDate = moment(start).add(24, 'hour');

  function handleApply(startDate: Moment, endDate: Moment) {
    setRange({ start: startDate, end: endDate });
  }

  return (
    <DateTimeRangeContainer
      ranges={ranges}
      start={range.start}
      end={range.end}
      local={local}
      maxDate={maxDate}
      applyCallback={handleApply}
      smartMode
    >
      <Input
        placeholder="Enter date..."
        value={`${range.start} - ${range.end}`}
        disabled
      />
    </DateTimeRangeContainer>
  );
}

export default App;
```

## Component Props

### `ranges`

(Required)
`Record<string, [Moment, Moment]>`

A record of ranges defined using an array of Moment times.

```js
const ranges = {
  'Today Only': [moment(start), moment(end)],
  'Yesterday Only': [
    moment(start).subtract(1, 'days'),
    moment(end).subtract(1, 'days'),
  ],
  '3 Days': [moment(start).subtract(3, 'days'), moment(end)],
};
```

### `start`

(Required)
`Moment`

Initial start Date set in the picker

### `end`

(Required)
`Moment`

Initial end Date set in the picker

### `local`

(Required)\*\*
`{format: string; sundayFirst: boolean; days: string[]; months: string[]; fromDate: string; toDate: string; selectingFrom: string; selectingTo: string; maxDate: string; close: string; apply: string; cancel: string;}`

Defines a local format for date labels to be shown as. Can also set Sunday to be first day or Monday. Local object accepts format and sunday first params. `format`: moment display format <br>`sundayFirst`: `true` if Sunday is the first day of the week. `false` if Monday is the first.

Example:

```js
const local = {
  format: 'DD-MM-YYYY HH:mm', // Moment format
  sundayFirst: false,
  days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'So'],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  fromDate: 'From Date',
  toDate: 'To Date',
  selectingFrom: 'Selecting From',
  selectingTo: 'Selecting To',
  maxDate: 'Max Date',
  close: 'Close',
  apply: 'Apply',
  cancel: 'Cancel',
};
```

### `applyCallback`

(Required) `(start: Moment, end: Moment) => void`

Function which is called when the apply button is clicked/pressed. Takes two params, start date and the end date.

### `maxDate`

(optional) `Moment`

Maximum date that can be selected.

### `rangeCallback`

(optional) `(index: number, value: number) => void`

### `autoApply`

(optional)\*\* `boolean`

When set there will only be one button in the bottom right to close the screen. With this set to `true` upon changing anything in picker the `callbackfunction` will be automatically called

### `descendingYears`

(optional) `boolean`

To set years be displayed in descending order in picker instead of ascending.

### `years`

(optional) `[number, number]`

Takes an array where the first value is the start year and the second values is the end year. This will update the dropdown years to only show these years.
**WARNING:** This does not affect the ability to type in years in the text box and go beyond the values set here.

Example:

```
years={[2010, 2020]}
```

Takes an array where the first value is the start year and the second values is the end year. This will
update the dropdown years to only show these years.
<br> WARNING: This does not affect the ability to type in years in the text box and go beyond the values set here.

### `smartMode`

(optional) `boolean`

The date time picker will switch the month on the right hand side (RHS) when two dates in the same month are selected. Can be used in
conjunction with `pastSearchFriendly` to switch the month on the left hand side (LHS) when the two dates are from the same month.

### `pastSearchFriendly`

(optional) `boolean`

**Note:** Requires `smartMode` to be enabled.

Changes the mode of the date time picker to be optimised for past searches. Where possible the start and end time will be shown on the RHS when the month and year are equal. This allows for the previous month to be shown on the LHS to allow easier backwards searching.

This setting is `false` by default meaning that the LHS is used when dates are selected in the same month & year

### `darkMode`

(optional) `boolean`

Changes the DateTimePicker to be in Dark Mode, default is Light Mode.

### `noMobileMode`

(optional) `boolean`

When set the mobile breakpoint to be ignored. Picker will always be displayed in full screen mode.

### `forceMobileMode`

(optional) `boolean`

When set the mobile breakpoint to be ignored. Picker will always be displayed in full screen mode.

### `twelveHoursClock`

(optional) `boolean`

When set the picker time values will be in 12 hour mode instead of 24 hour mode

### `standaloneMode`

(optional) `boolean`

When set the picker will be open by default.

### `leftMode`

(optional) `boolean`

When set and changed the picker will open to the left (right to left) instead of the default which is to open to the right (left to right)

### `centerMode`

(optional) `boolean`

To allow flexibility, center mode has been added where leftMode or default is not enough.

## Development

In the project directory, run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**Hot module reloading** is enabled.

### `npm run build`

Builds the app for production to the `/dist` folder using vite's [library mode](https://vitejs.dev/guide/build.html#library-mode).

## Roadmap

- [ ] Support TypeScript
- [ ] The ability to add custom CSS classes for different parts of the picker
- [ ] Write more tests

## License

[MIT](/LICENSE.md)
