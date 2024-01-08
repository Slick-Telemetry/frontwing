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
