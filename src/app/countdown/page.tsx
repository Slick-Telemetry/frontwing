'use client';

import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';

const date = '2025-03-13T21:30:00-04:00';

export default function CountdownPage() {
  const [duration, setDuration] = useState(
    moment.duration(moment(date).diff(moment())),
  );

  const months = useMemo(() => duration.months(), [duration]);
  const weeks = useMemo(() => Math.floor(duration.asWeeks()), [duration]);
  const days = useMemo(() => duration.days(), [duration]);
  const seconds = useMemo(() => duration.seconds(), [duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(moment.duration(moment(date).diff(moment())));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className='h-[700px] bg-[url(https://upload.wikimedia.org/wikipedia/commons/8/8e/Melbourne_Grand_Prix_Circuit%2C_March_22%2C_2018_SkySat_%28cropped%29.jpg)] bg-cover bg-center text-center'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-8 bg-black/60'>
        <h1 className='text-6xl font-bold'>Countdown to 2025</h1>
        <div className='grid w-lg grid-cols-4'>
          <Digit time={months} name='month' />
          <Digit time={weeks} name='week' />
          <Digit time={days} name='day' />
          <Digit time={seconds} name='second' />
        </div>
        <div>
          <h2 className='text-4xl'>
            Practice 1<br />
            Australian Grand Prix
          </h2>
          <p>{moment(date).format('LLLL')}</p>
        </div>
      </div>
    </main>
  );
}

const Digit = ({ time, name }: { time: number; name: string }) => {
  return (
    <div className='grid text-center'>
      <p className='text-8xl'>{time}</p>
      <p className='text-2xl'>
        {name}
        {time > 1 && 's'}
      </p>
    </div>
  );
};
