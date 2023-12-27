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
        className='grid grid-cols-2 items-center border-b border-black bg-slate-200 px-4 py-2'
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
    <div className='relative flex min-h-32 items-end border-b p-4 '>
      <figure className='absolute inset-0 z-0 bg-gradient-to-tr from-base-100'>
        <Image
          className='w-full mix-blend-overlay'
          src='https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
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
  <div className='relative flex min-h-32 items-center overflow-hidden rounded p-4'>
    <figure className='absolute inset-0 z-0 flex items-center justify-end bg-gradient-to-r from-base-100'>
      <Image
        className='w-full mix-blend-overlay'
        src='https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
        alt='Shoes'
      />
    </figure>
    <div className='relative z-0 flex gap-4'>
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

export const RaceResults = () => (
  <>
    <WinterTesting />
    <div className='mt-4 grid grid-cols-2 gap-4'>
      {/* 10 Placeholder Cards */}
      {Array.from(Array(10).keys()).map((item) => (
        <ResultCard key={item} />
      ))}
    </div>
  </>
);
