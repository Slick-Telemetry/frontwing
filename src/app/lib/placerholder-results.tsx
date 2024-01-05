import { faker } from '@faker-js/faker';

export const DriverHeadings = [
  'Pos.',
  'Driver',
  'Points',
  // Race Starts
  // Race Finishes
  // Podiums
];
export const ConstuctorHeadings = [
  'Pos.',
  'Constructor',
  'Points',
  'Drivers',
  // Best Result
  // DNFs
];

const formatDriver = (key: string, i: number) => {
  switch (key) {
    case 'Pos.':
      return i + 1;
    case 'Driver':
      return (
        <>
          {faker.lorem.word()}
          <br />
          <span className='text-xs' suppressHydrationWarning={true}>
            {faker.lorem.word()}
          </span>
        </>
      );
    case 'Points':
      return faker.number.int(26);
  }
};
const formatConstructor = (key: string, i: number) => {
  switch (key) {
    case 'Pos.':
      return i + 1;
    case 'Constructor':
      return faker.lorem.word();
    case 'Points':
      return faker.number.int(51);
    case 'Drivers':
      return (
        <>
          {faker.lorem.word()} - {faker.number.int(26)}, {faker.lorem.word()} -{' '}
          {faker.number.int(26)}
        </>
      );
  }
};

export const constructorsData = Array.from({ length: 20 }, (_v, index) =>
  ConstuctorHeadings.reduce(
    (obj, value) => ({
      ...obj,
      [value]: formatConstructor(value, index),
    }),
    {},
  ),
);

export const driverData = Array.from({ length: 20 }, (_v, index) =>
  DriverHeadings.reduce(
    (obj, value) => ({ ...obj, [value]: formatDriver(value, index) }),
    {},
  ),
);
