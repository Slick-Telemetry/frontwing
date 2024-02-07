import { dataConfig } from './fakerData';
import { serverUrl } from '../constants';

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

export const formatDuration = (durationInMilliseconds: number) => {
  // Pad single-digit values with leading zeros
  const pad = (value: number) => {
    return value < 10 ? '0' + value : value;
  };

  // Calculate hours, minutes, seconds, and milliseconds
  const hours = Math.floor(durationInMilliseconds / 3600000);
  const minutes = Math.floor((durationInMilliseconds % 3600000) / 60000);
  const seconds = Math.floor((durationInMilliseconds % 60000) / 1000);
  const milliseconds = durationInMilliseconds % 1000;

  if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0)
    return '-';
  else if (hours === 0 && minutes === 0 && seconds === 0)
    return '0.' + pad(milliseconds);
  else if (hours === 0 && minutes === 0)
    return seconds + '.' + pad(milliseconds);
  else if (hours === 0)
    return minutes + ':' + pad(seconds) + '.' + pad(milliseconds);
  else
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
  let session = 'None';

  if (event.Session5 !== 'None') session = event.Session5;
  else if (event.Session4 !== 'None') session = event.Session4;
  else session = event.Session3;

  return session;
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
  // console.log(`making fetch to: ${serverUrl}/${endpoint}`);
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

  return data;
};
