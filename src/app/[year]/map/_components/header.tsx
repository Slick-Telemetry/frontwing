import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { eventLocationEncode } from '@/lib/utils';

import { SprintBadge } from '@/components/sprint-badge';
import { Separator } from '@/components/ui/separator';

import { FragmentType, graphql, useFragment } from '@/types';

const MapHeader_ScheduleFragment = graphql(`
  fragment MapHeader_ScheduleFragment on schedule {
    event_name
    round_number
    event_date
    year
    location
    country
    event_format
    session1
    session2
    session3
    session4
    session5
    session1_date_utc
    session2_date_utc
    session3_date_utc
    session4_date_utc
    session5_date_utc
  }
`);

type HeaderProps = {
  evt?: FragmentType<typeof MapHeader_ScheduleFragment>;
  maxRounds?: number;
  children?: React.ReactNode;
};

type SessionKey =
  | 'session1'
  | 'session2'
  | 'session3'
  | 'session4'
  | 'session5';

const sessionKeys = [
  'session1',
  'session2',
  'session3',
  'session4',
  'session5',
] as SessionKey[];
export default function Header({ maxRounds = 0, ...props }: HeaderProps) {
  const evt = useFragment(MapHeader_ScheduleFragment, props?.evt);
  const router = useRouter();

  if (!evt) return;

  return (
    <div className='flex justify-between'>
      <div className='relative flex flex-1 justify-between gap-4 overflow-hidden px-2'>
        {/* Event Details */}
        <div className='py-2 pb-10'>
          {/* Event Title */}
          <h2 className='pointer-cursor line-clamp-1 text-3xl font-semibold hover:underline'>
            <Link href={`/${evt.year}/${eventLocationEncode(evt.location)}`}>
              {evt.event_name}
            </Link>
          </h2>

          <p>
            {evt.location}, {evt.country}
          </p>
          {/* Attributes */}
          <div className='flex items-center text-xs md:text-sm'>
            <p>
              {new Date(evt.event_date as string).toLocaleDateString(
                undefined,
                {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                },
              )}
            </p>

            <Separator
              orientation='vertical'
              className='mx-2 data-[orientation=vertical]:h-4'
            />
            <p>
              Round {evt.round_number}
              {maxRounds >= 1 ? `/${maxRounds}` : ''}
            </p>
            <Separator
              orientation='vertical'
              className='mx-2 data-[orientation=vertical]:h-4'
            />
            <SprintBadge format={evt.event_format} />
          </div>
        </div>

        {/* Marquee / Top Three goes here */}
        {props.children}
      </div>

      <div className='bg-muted flex flex-col justify-evenly px-3 py-2 md:hidden lg:flex'>
        {sessionKeys.map((session) => (
          <div
            className='hover:bg-accent flex cursor-pointer items-center justify-between gap-8 rounded px-1'
            key={evt[session]}
            onClick={() => {
              router.push(
                `/${evt.year}/${eventLocationEncode(evt.location)}/${eventLocationEncode(evt[session])}`,
              );
            }}
            aria-label={`${evt[session]} of ${evt.year} ${evt.event_name}`}
          >
            <p>{evt[session]?.replace(/_/g, ' ')}</p>
            <p className='text-accent-foreground text-sm'>
              {new Date(
                evt[`${session}_date_utc`] as string,
              ).toLocaleDateString(undefined, {
                year: '2-digit',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
