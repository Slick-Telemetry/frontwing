import { type ClassValue, clsx } from 'clsx';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';
// import { alpha3ToAlpha2, isValid } from 'i18n-iso-countries'
// import getUnicodeFlagIcon from 'country-flag-icons/unicode'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getColor = (date?: string | null) => {
  if (!date) return '#4264FB';

  // If today
  if (moment(date).isSame(moment(), 'day')) return '#4264FB';
  // If past
  else if (moment(date).isBefore(moment(), 'day')) return '#28a745';
  // else is future
  else return '#FF0000';
};

// export const getCountryFlag = (country_code?: string) => {
//   if (!country_code) return;
//   console.log(
//     isValid(country_code), country_code
//   );
//   const alpha2 = alpha3ToAlpha2(country_code)
//   if (!alpha2) return;
//   console.log('alpha2', alpha2)

//   const icon = getUnicodeFlagIcon(alpha2)
//   return icon || null;
// }
