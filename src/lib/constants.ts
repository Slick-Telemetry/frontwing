const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;

const sessionUrlParams = {
  'Practice 1': 'fp1',
  'Practice 2': 'fp2',
  'Practice 3': 'fp3',
  'Sprint Shootout': 'sprint_quali',
  Qualifying: 'quali',
  Sprint: 'sprint',
  Race: 'race',
};

const eventErrorMsg = 'Invalid event name';
const sessionErrorMsg = 'Invalid session name for event';

// Dropdown defaults
const eventDefault = 'All Events';
const driverDefault = 'All Drivers';
const sessionDefault = 'Race';

export {
  bearerToken,
  driverDefault,
  eventDefault,
  eventErrorMsg,
  serverUrl,
  sessionDefault,
  sessionErrorMsg,
  sessionUrlParams,
};
