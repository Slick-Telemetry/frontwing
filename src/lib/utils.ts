import { type ClassValue, clsx } from 'clsx';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { getAlpha2Code, registerLocale } from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @description Return value for default background gradient
 * @param {string} color
 */
export const bgGradient = (color: string) =>
  `linear-gradient(to top left, ${hexToRgba(color, 0.8)}, ${hexToRgba(color, 0)})`;

/**
 * @description resolve if event is past, present, future
 * @param {(string | null)} [date]
 * @return {string}  {('past' | 'present' | 'future')}
 */
export const eventTiming = (
  date?: string | null,
): 'past' | 'present' | 'future' => {
  if (!date) return 'past';

  if (moment(date).isSame(moment(), 'day')) return 'present';
  else if (moment(date).isBefore(moment(), 'day')) return 'past';
  else return 'future';
};

const mapColors = {
  present: '#4264FB',
  past: '#28a745',
  future: '#FF0000',
};
/**
 * @description Get designated map color
 * @param {(string | null)} [date]
 * @return {string} value of mapColor
 */
export const getColor = (
  date?: string | null,
): (typeof mapColors)[keyof typeof mapColors] => {
  const timing = eventTiming(date);
  return mapColors[timing];
};

/**
 * @description converts hexCode to rgba used for background gradients
 * @param {string} hex
 * @param {number} opacity
 * @return {*}
 */
export const hexToRgba = (hex: string, opacity: number) => {
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r},${g},${b},${opacity})`;
};

/**
 * @description Take a position value and returns position end
 * @param {(number | string)} position
 * @return {('st' | 'nd' | 'rd' | 'th')}
 */
export const positionEnding = (position: number | string) => {
  // Convert to int
  position = typeof position === 'string' ? parseInt(position) : position;
  // Format
  if ([1, 21].includes(position)) return 'st';
  else if ([2, 22].includes(position)) return 'nd';
  else if ([3, 23].includes(position)) return 'rd';
  else return 'th';
};

export const getCountryFlagByCountryName = (country_code?: string) => {
  if (!country_code) return;

  // Register the languages you want to use to minimize the file size
  registerLocale(enLocale);
  // Get alpha2 code
  const alpha2 = getAlpha2Code(country_code, 'en');
  if (!alpha2) return;

  // Get icon from code
  const icon = getUnicodeFlagIcon(alpha2);
  return icon || null;
};
