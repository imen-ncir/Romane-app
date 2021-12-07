import {Dimensions, Platform} from 'react-native';
import {PickerPresets} from '../../constants';
import {SubjectDTO} from '../../modules/Courses/services';

// Sizes
const {height: D_HEIGHT, width: D_WIDTH} = (() => {
  const {width, height} = Dimensions.get('window');
  if (width === 0 && height === 0) {
    return Dimensions.get('screen');
  }
  return {width, height};
})();

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export const IS_IPHONE_X = (() => {
  if (Platform.OS === 'web') {
    return false;
  }
  return (
    (Platform.OS === 'ios' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    (D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
    (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT)
  );
})();

const {width, height} = Dimensions.get('window');
let calRatio = width <= height ? 16 * (width / height) : 16 * (height / width);
if (width <= height) {
  if (calRatio < 9) {
    calRatio = width / 9;
  } else {
    calRatio = height / 18;
  }
} else {
  if (calRatio < 9) {
    calRatio = height / 9;
  } else {
    calRatio = width / 18;
  }
}

export const screenWidth = width;
export const screenHeight = height;
export const ratio = calRatio / (360 / 9);

// Colors
export const rnd = (max: number = 256): number => Math.random() * max;
export const generateColor = (): string => `rgb(${rnd()},${rnd()},${rnd()})`;
export const generateColorFromPalette = (): string => {
  return PickerPresets[Math.floor(rnd(PickerPresets.length - 1))];
};

// Dates
export const padNumber = (s: number) => (s < 10 ? '0' + s : s);
export const formatDate = (inputFormat: Date, withYear: boolean = false) => {
  if (!inputFormat) return 'N/A';
  var d = new Date(inputFormat);

  const values = [padNumber(d.getDate()), padNumber(d.getMonth() + 1)];

  if (withYear) {
    values.push(d.getFullYear());
  }

  return values.join('/');
};
export const formatTime = (inputFormat: Date) => {
  if (!inputFormat) return 'N/A';
  var d = new Date(inputFormat);

  const values = [padNumber(d.getHours()), padNumber(d.getMinutes() + 1)];

  return values.join(':');
};
export const isToday = (someDate: Date) => {
  if (!someDate) return false;
  const date = new Date(someDate);
  const today = new Date();
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
};

export function replaceItemAtIndex(arr: any[], index: number, newValue: any) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
export function removeItemAtIndex(arr: any[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

// Arrays
export function printArray(xs: any[]) {
  xs.forEach(i => console.log(i));
}

export function groupBy(xs: any[], key: string) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function groupSum(xs: any[], keyName: string, field: string) {
  return [
    ...xs
      .reduce((map, item) => {
        const key = item[keyName];
        const prev = map.get(key);

        if (prev) {
          prev[field] += item[field] === true ? 1 : 0;
        } else {
          map.set(key, Object.assign({}, item));
        }

        return map;
      }, new Map())
      .values(),
  ];
}

export function compareString(a: any, b: any) {
  if (a.subject < b.subject) {
    return -1;
  }
  if (a.subject > b.subject) {
    return 1;
  }
  return 0;
}

type sortType = 'asc' | 'desc';
function compare(a: any, b: any, field: string, order: sortType) {
  if (!a[field]) return order === 'asc' ? -1 : 1;
  if (a[field] < b[field]) {
    return order === 'asc' ? -1 : 1;
  }
  if (a[field] > b[field]) {
    return order === 'asc' ? 1 : -1;
  }
  return 0;
}
export function sortBy(array: any[], field: string, order: sortType = 'asc') {
  return array.sort((a, b) => compare(a, b, field, order));
}

export function sum(array: any[], key: string) {
  return array.reduce((a, b) => a + (b[key] || 0), 0);
}

export function findSubjectColor(subject: string, subjects: SubjectDTO[]) {
  const subjectTitle = subject.trim().toLowerCase();
  const exists = subjects.find(
    s => s.title.trim().toLowerCase() === subjectTitle,
  );
  if (exists) {
    return exists.color;
  }
  return '';
}

// Maths
export function calcPercent(value: number, max: number): number {
  if (!value || value === 0 || max === 0) return 0;
  return Math.floor((value * 100) / max);
}

export function toMoneyFormat(value: number): string {
  return (Math.round((value + Number.EPSILON) * 100) / 100).toFixed(2);
}
export function toRatingFormat(value: number): string {
  return value.toFixed(1);
}
export function toDownloadFormat(value: number): string {
  if (value < 1000) return value.toFixed(0);
  else if (value <= 10000) return value / 1000 + 'K';
  else if (value < 1000000) return value / 1000000 + 'M';

  return value.toString();
}
