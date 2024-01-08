/**
 * @description
 * Get all possible seasons/years with results
 * @return {*}  {string[]}
 */
export const f1Seasons = (): string[] => {
  // Discuss : Bump to fetch call to get data
  // ! Alter to be dynamic
  const testingDate = new Date('02/22/2024');

  const currDate = new Date();
  let currYear = currDate.getFullYear();

  // Compare curr date to testing date (Feb 22 2024)
  // If same year as testing and before testing date
  // Get previous year
  if (
    testingDate.getFullYear() === currYear &&
    currDate.getTime() < testingDate.getTime()
  ) {
    currYear -= 1;
  }

  // Fill array with values between range
  return Array.from({ length: currYear - 1950 + 1 }, (_v, index) =>
    (currYear - index).toString(),
  );
};

const dataConfig: { [key: string]: string[] } = {
  seasons: f1Seasons(),
  races: ['All Races', 'Bahrain', 'Mexico', 'Monaco', 'Imola', 'Spain'],
  drivers: [
    'All Drivers',
    'Drive 1',
    'Drive 2',
    'Drive 3',
    'Drive 4',
    'Drive 5',
  ],
};

export const fetchAPI = (endpoint: string) => {
  const server = document.body.classList.contains('server');
  const dummy: string[] | false = dataConfig[endpoint] || false;

  if (!server) {
    return dummy;
  } else {
    // Fetch from server
    // TODO : update to axios
    const data = fetch(`http://0.0.0.0:80/${endpoint}`).then(
      (res) => {
        if (!res.ok) {
          // console.error(`Backend responded with ${res.status} error`);
          return null;
        }
        return res.json();
      },
      () => {
        // console.error('Could not reach backend', error);
        return null;
      },
    );
    // if error use dummy data

    return data || dataConfig;
  }
};
