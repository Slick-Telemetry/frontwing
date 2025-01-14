// import { useAtom } from 'jotai';
// import Image from 'next/image';

// import { eventList } from '@/state-mgmt/store';

// export const RaceSchedule = () => {
//   const [races] = useAtom(eventList);

//   if (races && races.length === 0)
//     return (
//       <div className='px-4 lg:px-0'>
//         <div className='mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-4'>
//           {/* 4 Placeholder Cards */}
//           {Array.from(Array(4).keys()).map((_, i) => (
//             <SkeletonResultCard key={'skeleton result card - ' + i} />
//           ))}
//         </div>
//       </div>
//     );

//   return (
//     <div className='px-4 lg:px-0'>
//       {/* If seasonAom === current/upcomming season, then add button to bring user to next event */}
//       <div className='mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-4'>
//         {/* 10 Placeholder Cards */}
//         {races?.map((race) => <ResultCard key={race.EventName} data={race} />)}
//       </div>
//     </div>
//   );
// };

// const SkeletonResultCard = () => (
//   <div className='card overflow-hidden p-4 shadow-xl'>
//     <div className='skeleton h-32 w-full'></div>

//     <div className='card-body p-0 pt-2'>
//       <div className='skeleton h-4 w-full'></div>
//       <div className='skeleton h-4 w-full'></div>

//       <div className='skeleton mx-auto h-[32px] w-[222px]'></div>
//     </div>
//   </div>
// );

// const ResultCard = ({ data }: { data: EventSchedule }) => {
//   const eventDate = new Date(data.EventDate);
//   const eventPassed = new Date() > eventDate;

//   return (
//     <div className='card bg-base-100 overflow-hidden shadow-xl'>
//       <div className='relative flex min-h-32 items-end p-4 '>
//         <figure className='from-base-100 absolute inset-0 z-0 bg-gradient-to-tr'>
//           <Image
//             width={928}
//             height={548}
//             className='w-full mix-blend-overlay'
//             loader={() =>
//               'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
//             }
//             src='/shoe.jpg'
//             alt='Shoes'
//           />
//         </figure>
//         <div className='relative z-0'>
//           <h3 className='card-title max-w-64'>
//             {data.OfficialEventName.slice(0, -5)}
//           </h3>
//         </div>
//       </div>

//       <div className='card-body px-0 pb-4 pt-2'>
//         <p className='px-4'>
//           {data.Location}, {data.Country}
//           <br />
//           {eventDate.toDateString()}
//         </p>

//         {eventPassed && (
//           <div className='card-actions justify-center'>
//             <button className='btn btn-primary btn-sm btn-wide'>Results</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
