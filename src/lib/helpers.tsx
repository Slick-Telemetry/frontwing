export const updateQueryState = (
  query: QueryProps,
  name: string,
  value: string,
  clear?: boolean,
) => {
  switch (name) {
    case 'season':
      return { season: value, event: '', session: '', driver: '' };
    case 'event':
      if (clear) return { ...query, event: value, session: '', driver: '' };
      return { ...query, event: value };

    case 'session':
      if (clear) return { ...query, session: value, driver: '' };
      return { ...query, session: value };

    case 'driver':
      return { ...query, driver: value };
    default:
      return query;
  }
};

// export const positionEnding = (position: number | string) => {
//   // Convert to int
//   position = typeof position === 'string' ? parseInt(position) : position;
//   // Format
//   if ([1, 21].includes(position)) return position + 'st';
//   else if ([2, 22].includes(position)) return position + 'nd';
//   else if ([3, 23].includes(position)) return position + 'rd';
//   else return position + 'th';
// };

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

/// Get a new searchParams string by merging the current
// searchParams with a provided key/value pair
export const updateSearchParams = (
  params: URLSearchParams,
  key: string,
  value: string,
  season?: string,
  session?: string,
) => {
  // *** Remove extra parameters
  switch (key) {
    //  If view skip extra steps
    case 'view':
      break;

    // If season is set, remove all other params
    case 'season':
      params.delete('event');
      params.delete('session');
      params.delete('driver');
      break;

    // If event is set, remove session and driver
    case 'event':
      // Make sure season is set
      if (season) {
        params.set('season', season);
      }
      params.delete('session');
      params.delete('driver');
      break;

    // If session is set, remove driver
    case 'session':
      params.delete('driver');
      break;

    case 'driver':
      // Make sure session is set
      if (session) {
        params.set('session', session);
      }
      break;
  }

  // Update specified param
  params.set(key, value);

  // Update View
  return params;
};
