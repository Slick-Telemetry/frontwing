const serverUrl = 'http://127.0.0.1:8081';

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
  driverDefault,
  eventDefault,
  eventErrorMsg,
  serverUrl,
  sessionDefault,
  sessionErrorMsg,
  sessionUrlParams,
};
