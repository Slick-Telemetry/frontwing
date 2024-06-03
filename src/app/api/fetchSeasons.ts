export const f1Seasons = (): string[] => {
  const currYear = new Date().getFullYear();

  // Fill array with values between range
  return Array.from({ length: currYear - 1950 + 1 }, (_v, index) =>
    (currYear - index).toString(),
  );
};
