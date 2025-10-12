'use client';
import { useQuery } from '@apollo/client/react';
import clsx from 'clsx';
import { ArrowUpRight, EyeOff, File, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

import {
  COMPETITION_SESSIONS,
  FINISHING_CLASSIFICATIONS,
  PRACTICE_SESSIONS,
  QUALIFYING_SESSIONS,
  SESSION_KEYS,
} from '@/lib/constants';
import { GET_EVENT_DETAILS } from '@/lib/queries';
import {
  eventLocationDecode,
  eventLocationEncode,
  formatLapTime,
} from '@/lib/utils';

import { CircuitMap } from '@/components/circuit-map';
import { EventDetails } from '@/components/event-details';
import { FullHeightLoader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';
import { Badge } from '@/components/ui/badge';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { FragmentType, graphql, useFragment } from '@/types';
import {
  GetEventDetailsQuery,
  Session_Name_Choices_Enum,
} from '@/types/graphql';

const EventPage = ({
  params,
}: {
  params: Promise<{ year: string; event: string }>;
}) => {
  const { year, event: eventLoc } = use(params);
  const { loading, data, error } = useQuery(GET_EVENT_DETAILS, {
    variables: {
      year: parseInt(year),
      event: eventLocationDecode(eventLoc),
    },
  });

  useEffect(() => {
    const col1 = document.getElementById('col1');
    const col2 = document.getElementById('col2');
    if (col2 && col1) {
      col2.style.maxHeight = col1.getBoundingClientRect().height + 'px';
    }
  });

  // TODO LOOK INTO THIS
  const sessions = [
    ...(data?.events[0]?.competition ?? []),
    ...(data?.events[0]?.qualifying ?? []),
    ...(data?.events[0]?.practice ?? []),
  ]
    .filter((session) => !!session) // Filter empty
    .sort(
      (
        sessA,
        sessB, // Sort by start_time
      ) =>
        (sessA?.scheduled_start_time_utc ?? '').localeCompare(
          sessB?.scheduled_start_time_utc ?? '',
        ),
    ) as GetEventDetailsQuery['events'][number][
    | 'competition'
    | 'qualifying'
    | 'practice'];

  if (loading) return <FullHeightLoader />;
  if (error) return <ServerPageError msg='Failed to load event details.' />;
  if (!data?.schedule || data?.schedule.length <= 0) {
    // TODO: return to season page
    return <ServerPageError msg={`Event, ${eventLoc}, not found`} />;
  }

  const event = data.schedule[0];
  return (
    <div className='flex grid-cols-3 flex-col gap-8 p-4 lg:grid lg:px-6'>
      <div
        id='col1'
        className='col-span-2 flex h-fit flex-col gap-8 overflow-auto'
      >
        <div>
          <div className='flex justify-between gap-4'>
            <div>
              <EventDetails evt={data?.schedule[0]} />
            </div>
            <div className='flex items-center justify-center px-8'>
              <CircuitMap
                circuitData={data.circuits[0]}
                className='max-h-[90px]'
              />
            </div>
          </div>

          <div className='relative grid gap-2 pt-4 md:grid-cols-5'>
            {SESSION_KEYS.map((sessId) => (
              <SessionStuff
                key={sessId}
                name={event[sessId]}
                date={event[`${sessId}_date_utc`]}
                eventLoc={eventLoc}
              />
            ))}
          </div>
        </div>
        {sessions && <ResultsTables sessions={sessions} />}
      </div>
      <div id='col2' className='flex flex-col gap-8 overflow-hidden'>
        <EventWinners drivers={data.drivers} location={event.location} />
        {data.fia_documents.length > 0 && (
          <FIADocs documents={data.fia_documents} />
        )}
      </div>
    </div>
  );
};

export default EventPage;

const SessionStuff = ({
  name,
  date,
  eventLoc,
}: {
  name?: string | null;
  date?: string | null;
  eventLoc: string;
}) => {
  const router = useRouter();
  return (
    <div
      id={`${name}-session`}
      className='bg-muted border-secondary hover:bg-secondary cursor-pointer rounded border px-4 py-2'
      onClick={() => router.push(`${eventLoc}/${eventLocationEncode(name)}`)}
      aria-label={name?.replace('_', ' ')}
    >
      <div className='flex justify-between'>
        <h3 className='truncate text-xl font-semibold tracking-tight'>
          {name?.replace('_', ' ')}
        </h3>
        <ArrowUpRight className='size-5' />
      </div>
      <p className='text-sm lg:text-base'>
        {new Date(date as string).toLocaleString(undefined, {
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })}
      </p>
    </div>
  );
};

const FIADocsFragment = graphql(`
  fragment FIADocs on fia_documents {
    title
    url
    publish_time
  }
`);

type FIADocsProps = {
  documents: FragmentType<typeof FIADocsFragment>[];
};

function FIADocs(props: FIADocsProps) {
  const documents = useFragment(FIADocsFragment, props?.documents);
  const [input, setInput] = useState('');

  const viewingDocs = documents.filter((d) =>
    d.title.toLowerCase().includes(input.toLowerCase()),
  );

  return (
    <div className='flex h-full flex-col gap-2 overflow-hidden'>
      <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight'>
        FIA Docs
      </h2>
      <InputGroup>
        <InputGroupInput
          onPaste={(e) => setInput(e.clipboardData.getData('text'))}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Search...'
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align='inline-end'>
          {viewingDocs.length} results
        </InputGroupAddon>
      </InputGroup>
      <ul className='relative grid h-full gap-2 overflow-scroll'>
        <div className='from-background sticky top-0 h-4 bg-gradient-to-b to-transparent'></div>

        {viewingDocs?.map((doc) => (
          <li
            key={doc.url ?? doc.title}
            className={clsx(
              'flex items-center gap-4 rounded border px-4 py-2 first-of-type:-mt-4',
              doc.url ? 'cursor-pointer' : 'cursor-not-allowed opacity-60',
            )}
            aria-label={doc.title}
            tabIndex={0}
            onClick={() =>
              doc.url &&
              window.open(
                `https://docs.google.com/gview?embedded=true&url=${doc.url}`,
                // '_blank',
              )
            }
          >
            <File className='stroke-accent-foreground fill-accent size-8' />
            <div className='w-full'>
              <p className='line-clamp-2'>{doc.title}</p>
              {/* <Separator className='my-1.5' /> */}
              <p className='mt-1 w-fit border-t pt-1 text-xs'>
                {new Date(doc.publish_time).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  // hourCycle: 'h24',
                })}
              </p>
            </div>
          </li>
        ))}
        <div className='from-background sticky bottom-0 h-4 bg-gradient-to-t to-transparent'></div>
      </ul>
    </div>
  );
}

const EventWinnersFragment = graphql(`
  fragment EventWinners on drivers {
    driver_sessions(
      where: {
        session: { event: { name: { _eq: $event } }, name: { _eq: Race } }
        results: { classified_position: { _eq: "1" } }
      }
    ) {
      constructorByConstructorId {
        name
        color
      }
    }
    full_name
    year
  }
`);

type EventWinnersProps = {
  location?: string | null;
  drivers: FragmentType<typeof EventWinnersFragment>[];
};

function EventWinners(props: EventWinnersProps) {
  const drivers = useFragment(EventWinnersFragment, props?.drivers);

  // const router = useRouter()

  return (
    <div className='rounded border p-4'>
      <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight'>
        Winners at {props.location?.replace('-', '\u2011')}
      </h2>
      <ul className='grid divide-y'>
        {drivers.map((d) => (
          <li
            key={`${d.year}_${d.full_name}`}
            className='flex items-center gap-2 py-1 last:pb-0'
          >
            <p className='font-semibold'>{d.year}</p>
            <p className='line-clamp-1 text-lg'>{d.full_name}</p>
            {d.driver_sessions[0].constructorByConstructorId?.name && (
              <Badge
                variant='outline'
                className='ml-auto inline w-fit truncate text-xs'
                style={{
                  borderColor: `#${d.driver_sessions[0].constructorByConstructorId?.color}`,
                }}
              >
                {d.driver_sessions[0].constructorByConstructorId?.name}
              </Badge>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResultsTables({
  sessions,
}: {
  sessions: GetEventDetailsQuery['events'][number][
    | 'competition'
    | 'qualifying'
    | 'practice'];
}) {
  const [hidden, setHidden] = useState(true);
  if (0 >= sessions?.length) return;
  return (
    <div className='grid gap-2'>
      <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight'>
        Results
      </h2>
      <Tabs defaultValue={SESSION_KEYS[0]}>
        <TabsList>
          {SESSION_KEYS.map((key, i) =>
            sessions[i]?.name ? (
              <TabsTrigger key={key} value={key}>
                {sessions[i]?.name?.replace('_', ' ')}
              </TabsTrigger>
            ) : null,
          )}
        </TabsList>
        {SESSION_KEYS.map((key, i) => {
          const sessionName = sessions[i]?.name as Session_Name_Choices_Enum;
          const isComp = COMPETITION_SESSIONS.includes(sessionName);
          const isQuali = QUALIFYING_SESSIONS.includes(sessionName);
          const isPractice = PRACTICE_SESSIONS.includes(sessionName);
          return (
            <TabsContent
              key={key}
              value={key}
              onClick={() => setHidden(false)}
              className={clsx('relative', hidden ? 'cursor-pointer' : '')}
            >
              <div
                className={clsx(
                  'grid min-h-96 divide-y',
                  hidden ? 'cursor-pointer blur' : '',
                )}
              >
                {isComp && (
                  <CompResults
                    driverSessions={
                      sessions[i]
                        .driver_sessions as GetEventDetailsQuery['events'][0]['competition'][number]['driver_sessions']
                    }
                  />
                )}
                {isQuali && (
                  <QualiResults
                    driverSessions={
                      sessions[i]
                        .driver_sessions as GetEventDetailsQuery['events'][0]['qualifying'][number]['driver_sessions']
                    }
                  />
                )}
                {isPractice && (
                  <PracticeResults
                    driverSessions={
                      sessions[i]
                        .driver_sessions as GetEventDetailsQuery['events'][0]['practice'][number]['driver_sessions']
                    }
                  />
                )}
              </div>
              {hidden && (
                <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2'>
                  <Badge variant='secondary' className='gap-2 text-base'>
                    <EyeOff className='size-4' />
                    Results are hidden
                  </Badge>
                  <p className='text-sm'>
                    Clicking will make all available results visible
                  </p>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
function CompResults({
  driverSessions,
}: {
  driverSessions: GetEventDetailsQuery['events'][0]['competition'][number]['driver_sessions'];
}) {
  const totalLaps = driverSessions[0]?.results[0].laps;
  return (
    <>
      <div
        className='grid auto-cols-fr grid-flow-col divide-x' // Get grid-cols based on event type
      >
        <p className='col-span-2 px-2 py-1'>Driver</p>
        <p className='px-2 py-1'>Time</p>
        <p className='px-2 py-1'>Fastest Lap</p>
        <p className='px-2 py-1'>Points</p>
      </div>
      {driverSessions.map((s, idx) => {
        return (
          <div
            key={s.driver?.full_name}
            className='grid auto-cols-fr grid-flow-col divide-x' // Get grid-cols based on event type
          >
            <div className='col-span-2 flex items-center px-2 py-1'>
              <span className='w-4 text-center'>{idx + 1}</span>
              <Separator
                orientation='vertical'
                className='mx-2 inline-block data-[orientation=vertical]:h-4'
              />
              <p>{s.driver?.full_name}</p>
            </div>
            <p className='px-2 py-1'>
              {s.results[0]?.classified_position &&
              s.results[0]?.classified_position in FINISHING_CLASSIFICATIONS ? (
                FINISHING_CLASSIFICATIONS[
                  s.results[0]
                    .classified_position as keyof typeof FINISHING_CLASSIFICATIONS
                ]
              ) : (
                <>
                  {idx !== 0 && '+'}
                  {s.results[0]?.total_race_time
                    ? formatLapTime(s.results[0]?.total_race_time)
                    : `${(totalLaps ?? 0) - (s.results[0].laps ?? 0)} Lap`}
                </>
              )}
            </p>
            <p className='px-2 py-1'>
              {s.fastest_lap[0]?.lap_time ? (
                <>
                  <span className='inline-block w-16'>
                    {formatLapTime(s.fastest_lap[0]?.lap_time)}
                  </span>{' '}
                  <Badge variant='outline'>
                    Lap {s.fastest_lap[0]?.lap_number}
                  </Badge>
                </>
              ) : (
                '--------'
              )}
            </p>
            <p className='px-2 py-1'>+25</p>
          </div>
        );
      })}
    </>
  );
}
function QualiResults({
  driverSessions,
}: {
  driverSessions: GetEventDetailsQuery['events'][0]['qualifying'][number]['driver_sessions'];
}) {
  return (
    <>
      <div
        className='grid auto-cols-fr grid-flow-col divide-x' // Get grid-cols based on event type
      >
        <p className='col-span-2 px-2 py-1'>Driver</p>
        <p className='px-2 py-1'>Q1</p>
        <p className='px-2 py-1'>Q2</p>
        <p className='px-2 py-1'>Q3</p>
      </div>
      {driverSessions.map((s, idx) => {
        return (
          <div
            key={s.driver?.full_name}
            className='grid auto-cols-fr grid-flow-col divide-x' // Get grid-cols based on event type
          >
            <div className='col-span-2 flex items-center px-2 py-1'>
              <span className='w-4 text-center'>{idx + 1}</span>
              <Separator
                orientation='vertical'
                className='mx-2 inline-block data-[orientation=vertical]:h-4'
              />
              <p>{s.driver?.full_name}</p>
            </div>
            <p className='px-2 py-1'>
              {formatLapTime(s.results[0]?.q1_time) || '--------'}
            </p>
            <p className='px-2 py-1'>
              {formatLapTime(s.results[0]?.q2_time) || '--------'}
            </p>
            <p className='px-2 py-1'>
              {formatLapTime(s.results[0]?.q3_time) || '--------'}
            </p>
          </div>
        );
      })}
    </>
  );
}
function PracticeResults({
  driverSessions,
}: {
  driverSessions: GetEventDetailsQuery['events'][0]['practice'][number]['driver_sessions'];
}) {
  return (
    <>
      <div
        className='grid auto-cols-fr grid-flow-col divide-x' // Get grid-cols based on event type
      >
        <p className='col-span-2 px-2 py-1'>Driver</p>
        <p className='px-2 py-1'>Fastest Lap</p>
        <p className='px-2 py-1'>Total Laps</p>
      </div>
      {driverSessions.map((s, idx) => {
        return (
          <div
            key={s.driver?.full_name}
            className='grid auto-cols-fr grid-flow-col divide-x' // Get grid-cols based on event type
          >
            <div className='col-span-2 flex items-center px-2 py-1'>
              <span className='w-4 text-center'>{idx + 1}</span>
              <Separator
                orientation='vertical'
                className='mx-2 inline-block data-[orientation=vertical]:h-4'
              />
              <p>{s.driver?.full_name}</p>
            </div>
            <p className='px-2 py-1'>
              {s.fastest_lap[0]?.lap_time ? (
                <>
                  <span className='inline-block w-16'>
                    {formatLapTime(s.fastest_lap[0]?.lap_time)}
                  </span>{' '}
                  <Badge variant='outline'>
                    Lap {s.fastest_lap[0]?.lap_number}
                  </Badge>
                </>
              ) : (
                '--------'
              )}
            </p>

            <p className='px-2 py-1'>
              {s.laps_aggregate.aggregate?.count ?? '--'}
            </p>
          </div>
        );
      })}
    </>
  );
}
