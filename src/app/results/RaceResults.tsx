import Image from 'next/image';

const TopThreeDummy = [
  {
    name: 'Driver 1',
    team: 'Team 1',
    time: '1:23.456',
  },
  {
    name: 'Driver 2',
    team: 'Team 3',
    time: '1:24.456',
  },
  {
    name: 'Driver 3',
    team: 'Team 2',
    time: '1:25.456',
  },
];

const TopThree = () => (
  <div className='mb-2 grid grid-rows-3 border-t border-black'>
    {TopThreeDummy.map((driver) => (
      <div
        key={driver.name}
        className='grid grid-cols-2 items-center border-b border-black bg-base-300 px-4 py-2'
      >
        <div className='flex flex-col'>
          <p>{driver.name}</p>
          <p className='text-sm'>{driver.team}</p>
        </div>
        <p>{driver.time}</p>
      </div>
    ))}
  </div>
);

const ResultCard = () => (
  <div className='card overflow-hidden bg-base-100 shadow-xl'>
    <div className='relative flex min-h-32 items-end p-4 '>
      <figure className='absolute inset-0 z-0 bg-gradient-to-tr from-base-100'>
        <Image
          width={928}
          height={548}
          className='w-full mix-blend-overlay'
          loader={() =>
            'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
          }
          src='/shoe.jpg'
          alt='Shoes'
        />
      </figure>
      <div className='relative z-0'>
        <h3 className='card-title '>Name of Grand Prix</h3>
      </div>
    </div>

    <div className='card-body px-0 pb-4 pt-2'>
      <p className='px-4'>
        Location
        <br />
        Time - Event Local & Client Local
      </p>

      <TopThree />

      <div className='card-actions justify-center'>
        <button className='btn btn-primary btn-sm btn-wide'>Results</button>
      </div>
    </div>
  </div>
);

const WinterTesting = () => (
  <div className='card relative min-h-32 justify-center overflow-hidden rounded-2xl p-4'>
    <figure className='absolute inset-0 z-0 flex items-center justify-end bg-gradient-to-r from-base-100'>
      <Image
        width={928}
        height={548}
        className='w-full mix-blend-overlay'
        loader={() =>
          'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
        }
        src='/shoe.jpg'
        alt='Shoes'
      />
    </figure>
    <div className='relative z-0 flex flex-col gap-4 lg:flex-row lg:items-center'>
      <div>
        <h3>Winter Testing</h3>
        <p>Sakhir, Bahrain</p>
      </div>
      <a role='button' className='btn btn-sm'>
        Testing Results
      </a>
    </div>
  </div>
);

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

//   <div className={clsx('card relative min-h-32 justify-center overflow-hidden rounded-2xl p-4', shimmer)}>
//   <figure className='absolute inset-0 z-0 flex items-center justify-end bg-gradient-to-r from-base-100'>
//     <Image
//       width={928}
//       height={548}
//       className='w-full mix-blend-overlay'
//       loader={() =>
//         'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
//       }
//       src='/shoe.jpg'
//       alt='Shoes'
//     />
//   </figure>
//   <div className='relative z-0 flex flex-col gap-4 lg:flex-row lg:items-center'>
//     <div>
//       <h3>Winter Testing</h3>
//       <p>Sakhir, Bahrain</p>
//     </div>
//     <a role='button' className='btn btn-sm'>
//       Testing Results
//     </a>
//   </div>
// </div>
const WinterTestingSkeleton = () => (
  <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
    <div className='mb-4 h-8 w-36 rounded-md bg-gray-100' />
    <div className='rounded-xl bg-gray-100 p-4'>
      <div className='sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4' />
      <div className='flex items-center pb-2 pt-6'>
        <div className='h-5 w-5 rounded-full bg-gray-200' />
        <div className='ml-2 h-4 w-20 rounded-md bg-gray-200' />
      </div>
    </div>
  </div>
);

export const RaceResults = () => {
  return (
    <div className='px-4 lg:px-0'>
      <WinterTestingSkeleton />
      <WinterTesting />
      <div className='mt-4 grid gap-4 md:grid-cols-2 2xl:grid-cols-3'>
        {/* 10 Placeholder Cards */}
        {Array.from(Array(10).keys()).map((item) => (
          <ResultCard key={item} />
        ))}
      </div>
    </div>
  );
};
