export const positionEnding = (position: number | string) => {
  // Convert to int
  position = typeof position === 'string' ? parseInt(position) : position;
  // Format
  if ([1, 21].includes(position)) return position + 'st';
  else if ([2, 22].includes(position)) return position + 'nd';
  else if ([3, 23].includes(position)) return position + 'rd';
  else return position + 'th';
};

export const toFahrenheit = (temp: number) => {
  return temp * (9 / 5) + 32;
};

export const fastestLap = (position: number, points: number) => {
  switch (position) {
    case 1:
      return points !== 25;
    case 2:
      return points !== 18;
    case 3:
      return points !== 15;
    case 4:
      return points !== 12;
    case 5:
      return points !== 10;
    case 6:
      return points !== 8;
    case 7:
      return points !== 6;
    case 8:
      return points !== 4;
    case 9:
      return points !== 2;
    case 10:
      return points !== 1;

    default:
      return false;
  }
};

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

export const sessionTitles = (event: ScheduleSchema) => {
  const titles: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const key = `Session${i}` as keyof ScheduleSchema;
    event[key] && event[key] !== 'None' && titles.push(event[key] as string);
  }

  return titles;
};

export const lastSession = (event: ScheduleSchema) => {
  let session = 'None';

  if (event.Session5 !== 'None') session = event.Session5;
  else if (event.Session4 !== 'None') session = event.Session4;
  else session = event.Session3;

  return session;
};
