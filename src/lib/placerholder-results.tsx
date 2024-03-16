import { faker } from '@faker-js/faker';

import { positionEnding } from './helpers';

export const DriverHeadings = [
  'position',
  'Driver',
  'Constructor',
  'Points',
  'Wins',
  // Race Starts
  // Race Finishes
  // Podiums
];

const formatDriver = (key: string, i: number) => {
  switch (key) {
    case 'position':
      return positionEnding(i + 1);
    case 'Constructor.name':
      return faker.lorem.word();
    // case 'Driver':
    //   return (
    //     <>
    //       {positionEnding(i + 1)}
    //       {" "}
    //       {faker.lorem.word()}
    //       <span className='text-xs md:hidden' suppressHydrationWarning={true}>
    //         <br />
    //         {faker.lorem.word()}
    //       </span>
    //     </>
    //   );
    case 'points':
      return faker.number.int(26);
    case 'wins':
      return faker.number.int(10);
  }
};

export const driverData = Array.from({ length: 20 }, (_v, index) =>
  DriverHeadings.reduce(
    (obj, value) => ({ ...obj, [value]: formatDriver(value, index) }),
    {},
  ),
);
