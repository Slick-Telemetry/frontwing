// export const toFahrenheit = (temp: number) => {
//   return temp * (9 / 5) + 32;
// };

const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;

export const formatDuration = (timeInterval: number) => {
  // Pad single-digit values with leading zeros
  const pad = (value: number) => {
    return value < 10 ? '0' + value : value;
  };

  // Calculate hours, minutes, seconds, and milliseconds
  const milliseconds = timeInterval % _second;
  const seconds = Math.floor((timeInterval % _minute) / _second);
  const minutes = Math.floor((timeInterval % _hour) / _minute);
  const hours = Math.floor((timeInterval % _day) / _hour);
  const days = Math.floor(timeInterval / _day);

  if (
    days === 0 &&
    hours === 0 &&
    minutes === 0 &&
    seconds === 0 &&
    milliseconds === 0
  )
    return '-';
  else if (days === 0 && hours === 0 && minutes === 0 && seconds === 0)
    return '0.' + pad(milliseconds);
  else if (days === 0 && hours === 0 && minutes === 0)
    return seconds + '.' + pad(milliseconds);
  else if (days === 0 && hours === 0)
    return minutes + ':' + pad(seconds) + '.' + pad(milliseconds);
  else if (days === 0)
    return (
      hours + ':' + pad(minutes) + ':' + pad(seconds) + '.' + pad(milliseconds)
    );
  else
    return (
      days +
      ' days ' +
      hours +
      ':' +
      pad(minutes) +
      ':' +
      pad(seconds) +
      '.' +
      pad(milliseconds)
    );
};
