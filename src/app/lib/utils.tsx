import { dataConfig } from './fakerData';
import { serverUrl } from '../../constants';

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

export const formatDuration = (
  durationInMilliseconds: number,
  timing = 'full',
) => {
  // Calculate hours, minutes, seconds, and milliseconds
  const hours = Math.floor(durationInMilliseconds / 3600000);
  const minutes = Math.floor((durationInMilliseconds % 3600000) / 60000);
  const seconds = Math.floor((durationInMilliseconds % 60000) / 1000);
  const milliseconds = durationInMilliseconds % 1000;

  // Pad single-digit values with leading zeros
  const pad = (value: number) => {
    return value < 10 ? '0' + value : value;
  };

  if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0)
    return '-';

  // Format based on timing
  if (timing === 'seconds') return seconds + '.' + pad(milliseconds);

  if (timing === 'minutes')
    return minutes + ':' + pad(seconds) + '.' + pad(milliseconds);

  if (timing === 'full')
    return (
      hours + ':' + pad(minutes) + ':' + pad(seconds) + '.' + pad(milliseconds)
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
  if (event.Session5 !== 'None') return event.Session5;
  else if (event.Session4 !== 'None') return event.Session4;
  else return event.Session3;
};

export const fetchAPI = async (
  endpoint: string,
  statusCheck: boolean = false,
) => {
  const useServer = statusCheck || document.body.classList.contains('server');
  // Headers for statusCheck so
  const options = statusCheck ? { headers: { cache: 'no-store' } } : {};

  // Get dummy data or return false
  const dummy: string[] | ScheduleSchema[] | false =
    dataConfig[
      endpoint.split('?')[0] as 'seasons' | 'schedule' | 'drivers' | 'sessions'
    ] || false;

  // If we are not using the server return the dummy data
  if (!useServer) {
    return dummy;
  }

  // Fetch from server
  const data = await fetch(`${serverUrl}/${endpoint}`, { ...options })
    .then(
      (res) => {
        // Response is not successful
        if (!res.ok) {
          throw new Error('Not 2xx response', { cause: res });
        }

        // Success parse data
        return res.json();
      },
      // Catch initial fetch error
      (err) => {
        throw new Error('Server not connecting', { cause: err });
      },
    )
    // Return parsed data
    .then((data) => data)
    // Catch errors from above
    .catch((err) => {
      if (err === 'Server not connecting') return dummy;
      if (err.status === 404) return dummy;

      return dummy;
    });

  // console.log('data', data)

  return data;
};
