'use client';

import { useEffect, useState } from 'react';

const date = '2025-03-13T21:30:00-04:00';
const breakdownDifference = (targetDate: Date, now: Date) => {
  return {
    months:
      targetDate.getMonth() -
      now.getMonth() +
      12 * (targetDate.getFullYear() - now.getFullYear()),
    weeks: Math.floor(
      (targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 7),
    ),
    days:
      Math.floor(
        (targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      ) % 7,
    minutes:
      Math.floor((targetDate.getTime() - now.getTime()) / (1000 * 60)) % 60,
    seconds: Math.floor((targetDate.getTime() - now.getTime()) / 1000) % 60,
  };
};
export default function CountdownPage() {
  const [duration, setDuration] = useState(
    breakdownDifference(new Date(date), new Date()),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = breakdownDifference(new Date(date), new Date());
      setDuration(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className='h-[700px] bg-[url(https://upload.wikimedia.org/wikipedia/commons/8/8e/Melbourne_Grand_Prix_Circuit%2C_March_22%2C_2018_SkySat_%28cropped%29.jpg)] bg-cover bg-center text-center'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-8 bg-black/60'>
        <h1 className='text-4xl font-bold md:text-6xl'>Countdown to 2025</h1>
        <div className='grid grid-cols-5 gap-2'>
          <Digit time={duration.months} name='month' />
          <Digit time={duration.weeks} name='week' />
          <Digit time={duration.days} name='day' />
          <Digit time={duration.minutes} name='minute' />
          <Digit time={duration.seconds} name='second' />
        </div>
        <div>
          <h2 className='text-2xl md:text-4xl'>
            Practice 1<br />
            Australian Grand Prix
          </h2>
          <p>
            {new Date(date).toLocaleString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </p>
        </div>
      </div>
    </main>
  );
}

const Digit = ({ time, name }: { time: number; name: string }) => {
  return (
    <div className='bg-background/75 grid w-32 rounded-xl py-2 text-center'>
      <p className='text-2xl md:text-6xl xl:text-8xl'>{time}</p>
      <p className='lg:text-2xl'>
        {name}
        {time !== 1 && 's'}
      </p>
    </div>
  );
};
