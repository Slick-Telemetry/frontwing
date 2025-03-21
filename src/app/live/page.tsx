'use client';

import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { inflateRawSync } from 'zlib';

import { positionEnding } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  CarData,
  DriverList,
  DriverListEntry,
  ExtrapolatedClock,
  Heartbeat,
  LiveTimingResponse,
  PositionData,
  RaceControlMessage,
  RaceControlMessages,
  SessionData,
  SessionInfo,
  TimingAppData,
  TimingData,
  TimingStats,
  TrackStatus,
  WeatherData,
} from '@/generated/mirrorsTypes';

function decodeAndParseInBrowser(base64Text: string) {
  // Step 1: Base64 decode to Uint8Array
  const buffer = Buffer.from(base64Text, 'base64');

  // Step 2: Inflate raw DEFLATE data
  const decompressed = inflateRawSync(buffer);

  // Step 3: Convert to UTF-8 string, strip BOM if present
  const decodedText = new TextDecoder('utf-8')
    .decode(decompressed)
    .replace(/^\uFEFF/, '');

  // Step 4: Parse (assuming JSON)
  return JSON.parse(decodedText);
}
// https://docs.fastf1.dev/api.html#fastf1.api.track_status_data
const trackStatusColorMap = {
  '1': 'green-600',
  '2': 'yellow-300',
  '4': 'yellow-500',
  '5': 'red-600',
  '6': 'yellow-500',
  '7': 'yellow-400',
};

const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  // const [socketUrl, setSocketUrl] = useState('https://xpqxkyy9kgg0.share.zrok.io');
  // const [socketUrl] = useState('ws://88.198.92.247:9000');
  const [socketUrl] = useState('http://localhost:9000/');

  const { lastMessage } = useWebSocket(socketUrl, {
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (_closeEvent) => true,
    reconnectInterval: 100,
  });

  const [extrapolatedClock, setExtrapolatedClock] =
    useState<ExtrapolatedClock | null>(null);
  const [trackStatus, setTrackStatus] = useState<TrackStatus | null>(null);
  const [heartbeat, setHeartbeat] = useState<string>('');
  const [driverList, setDriverList] = useState<DriverList | null>(null);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [raceControlMessages, setRaceControlMessages] =
    useState<RaceControlMessages | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [stintTyreData, setStintTyreData] = useState<TimingAppData | null>(
    null,
  );
  const [bestTimes, setBestTimes] = useState<TimingStats | null>(null);
  const [overallStats, setOverallStats] = useState<TimingData | null>(null);
  const [carData, setCarData] = useState<CarData | null>(null);
  const [_positionData, setPositionData] = useState<PositionData | null>(null);

  useEffect(() => {
    if (!lastMessage) return;

    // Parse
    const lastMsg = JSON.parse(lastMessage.data) as LiveTimingResponse;

    // R === Result
    if ('R' in lastMsg) {
      const cats = Object.keys(lastMsg.R);

      cats.map((cat) => {
        const msg = lastMsg.R[cat as keyof typeof lastMsg.R];

        if (cat === 'DriverList') {
          setDriverList(msg as DriverList);
        }

        if (cat === 'ExtrapolatedClock') {
          setExtrapolatedClock(msg as ExtrapolatedClock);
        }

        if (cat === 'TrackStatus') {
          setTrackStatus(msg as TrackStatus);
        }

        if (cat === 'Heartbeat') {
          setHeartbeat((msg as Heartbeat).Utc);
        }

        if (cat === 'SessionInfo') {
          setSessionInfo(msg as SessionInfo);
        }

        if (cat === 'SessionData') {
          setSessionData(msg as SessionData);
        }

        if (cat === 'RaceControlMessages') {
          setRaceControlMessages(msg as RaceControlMessages);
        }

        if (cat === 'WeatherData') {
          setWeatherData(msg as WeatherData);
        }

        // Driver Stints
        if (cat === 'TimingAppData') {
          setStintTyreData(msg as TimingAppData);
        }

        // Driver Bests
        if (cat === 'TimingStats') {
          setBestTimes(msg as TimingStats);
        }

        // Live track timing
        if (cat === 'TimingData') {
          setOverallStats(msg as TimingData);
        }

        // Somewhat a repreat of TimingData confined to top 3
        // if (cat === 'TopThree') {
        // }

        if (cat === 'Position.z') {
          setPositionData(decodeAndParseInBrowser(msg as string));
        }
        if (cat === 'CarData.z') {
          setCarData(decodeAndParseInBrowser(msg as string));
        }
      });

      // M === Message
      // } else if ('M' in lastMsg && lastMsg.M.length > 0) {
      //   lastMsg.M.map((m: StreamingFeedMessage) => {
      //     // confirma message data/attributes
      //     if (m.A) {
      //       // todo: modify dt to time-difference from start of session
      //       // *** this is deconstructed in order to find time differnce
      //       const [cat, msg] = m.A;

      //       if (cat === 'Heartbeat') {
      //         setHeartbeat((msg as Heartbeat).Utc);
      //       }

      //       if (cat === 'TimingData') {
      //         const timingDataLines = (msg as StreamingTimingData).Lines;
      //         Object.keys(timingDataLines).map((driver) => {
      //           // For each driver we need to update or create an object
      //           // Sectors: {sector# : {Segments: {segment# : {Status: number}}}}

      //           // If no driver exists add this object
      //           if (!timingData[driver]) {
      //             setTimingData((prev) => ({
      //               ...prev,
      //               [driver]: timingDataLines[driver],
      //             }));
      //             return;
      //           }

      //           // Driver exists we need to update them
      //           const updatedDriver = {
      //             ...timingData[driver],
      //             ...timingDataLines[driver],
      //           };
      //           // Update driver state
      //           setTimingData((prev) => ({
      //             ...prev,
      //             [driver]: updatedDriver,
      //           }));
      //         });
      //       }
      //     }
      //   });

      // Send to database
      // return translatedData;
    }
  }, [lastMessage]);

  return (
    <div>
      {/* Hidden element to load tailwind trackstatus colors */}
      <div className='hidden'>
        <div className='bg-yellow-300' />
        <div className='bg-yellow-400' />
        <div className='bg-yellow-500' />
        <div className='bg-red-600' />
        <div className='bg-green-600' />
      </div>
      <div className='items-end justify-between md:flex'>
        {sessionInfo && (
          <div>
            <Badge>{sessionInfo.Name}</Badge>
            <p className='text-4xl'>{sessionInfo.Meeting.Name}</p>
          </div>
        )}
        <div className='grid gap-1 text-right'>
          <div className='ml-auto flex items-center gap-4'>
            {trackStatus && (
              <p
                className='w-fit rounded px-2 py-1'
                style={{
                  backgroundColor: `var(--color-${trackStatusColorMap[trackStatus.Status as keyof typeof trackStatusColorMap]})`,
                }}
              >
                {trackStatus.Message}
              </p>
            )}
            {extrapolatedClock?.Remaining && (
              <p className='bg-muted w-fit rounded px-2 py-1'>
                {extrapolatedClock.Remaining}
              </p>
            )}
          </div>
          {heartbeat && (
            <p className='text-sm'>
              Updated: {new Date(heartbeat).toLocaleString()}
            </p>
          )}
        </div>
      </div>
      <Tabs className='border p-2' defaultValue='overall'>
        <div className='flex items-center gap-4'>
          <TabsList>
            <TabsTrigger value='overall'>Home</TabsTrigger>
            <TabsTrigger value='best-times'>Best Times</TabsTrigger>
            <TabsTrigger value='stints-tyres'>Tyres</TabsTrigger>
          </TabsList>
          {bestTimes && (
            <TabsContent value='best-times'>
              {bestTimes.SessionType}
            </TabsContent>
          )}
          {overallStats && (
            <TabsContent value='overall'>
              <div className='flex gap-4'>
                {overallStats.CutOffTime && (
                  <p>
                    Cutoff: {overallStats.CutOffTime} (
                    {overallStats.CutOffPercentage}%)
                  </p>
                )}
                {overallStats.SessionPart && (
                  <p>Session Part: {overallStats.SessionPart}</p>
                )}
                {overallStats.NoEntries &&
                  overallStats.SessionPart &&
                  overallStats.NoEntries[overallStats.SessionPart - 1] && (
                    <p>
                      Entries:{' '}
                      {overallStats.NoEntries[overallStats.SessionPart - 1]}
                    </p>
                  )}
              </div>
            </TabsContent>
          )}
        </div>

        {driverList && (
          <div className='grid'>
            {Object.keys(driverList).map((driver) => {
              const driverPersonal = driverList[driver] as DriverListEntry;
              const driverStint =
                stintTyreData &&
                stintTyreData.Lines[driver as keyof typeof stintTyreData];

              const driverBests =
                bestTimes && bestTimes.Lines[driver as keyof typeof bestTimes];

              const driverStats =
                overallStats &&
                overallStats.Lines[driver as keyof typeof overallStats];
              const latestEntry =
                carData && carData.Entries[carData.Entries.length - 1];
              const carStats = latestEntry?.Cars?.[driver];

              return (
                <div
                  key={driverPersonal.FullName}
                  className={clsx(
                    'flex h-10 items-center gap-4 border-b',
                    driverStats &&
                      (driverStats.KnockedOut || driverStats.Retired) &&
                      'opacity-75',
                  )}
                  style={{
                    order:
                      (driverBests &&
                        driverBests.PersonalBestLapTime.Position) ||
                      'unset',
                  }}
                >
                  <div
                    className='flex h-full items-center justify-between px-2'
                    style={{ backgroundColor: '#' + driverPersonal.TeamColour }}
                  >
                    {/* Driver Abbreviation an number */}
                    {(driverStint || driverBests) && (
                      <p className='w-8'>
                        {driverStint?.RacingNumber || driverBests?.RacingNumber}
                      </p>
                    )}
                    <p
                      className='bg-background w-12 rounded text-center font-black'
                      style={{
                        color: '#' + driverPersonal.TeamColour,
                      }}
                    >
                      {driverPersonal.Tla}
                    </p>
                  </div>

                  <TabsContent value='overall'>
                    {/* Driver Stints */}
                    {driverStats && (
                      <div className='flex items-center gap-4'>
                        <div className='w-12 text-center'>
                          <p>L{driverStats.NumberOfLaps}</p>
                          <p className='text-xs'>
                            {driverStats.NumberOfPitStops} Stops
                          </p>
                        </div>
                        <p className='w-12'>
                          Pit{' '}
                          {(driverStats.InPit && 'In') ||
                            (driverStats.PitOut && 'Out')}
                        </p>
                        <div className='w-20'>
                          <p
                            className={clsx(
                              'w-20',
                              driverStats.LastLapTime.OverallFastest &&
                                'text-purple-600',
                              driverStats.LastLapTime.PersonalFastest &&
                                'text-green-600',
                            )}
                          >
                            {driverStats.LastLapTime.Value}
                          </p>
                          <p className='text-xs'>
                            {driverStats.BestLapTime.Value ||
                              driverStats.BestLapTimes?.[0]?.Value}{' '}
                            L
                            {driverStats.BestLapTime.Lap ||
                              driverStats.BestLapTimes?.[0]?.Lap}
                          </p>
                        </div>
                        <div className='w-20'>
                          <p>
                            {
                              driverStats.Stats[driverStats.Stats.length - 1]
                                .TimeDifftoPositionAhead
                            }
                          </p>
                          <p className='text-xs'>
                            {
                              driverStats.Stats[driverStats.Stats.length - 1]
                                .TimeDiffToFastest
                            }
                          </p>
                        </div>
                        {driverStats.Sectors.map((sector, i) => {
                          return (
                            <div
                              key={'sector_' + i}
                              className='grid text-center'
                            >
                              <p
                                className={clsx(
                                  driverStats.LastLapTime.OverallFastest &&
                                    'text-purple-600',
                                  driverStats.LastLapTime.PersonalFastest &&
                                    'text-green-600',
                                )}
                              >
                                {sector.Value}
                              </p>
                              <div className='flex'>
                                {sector.Segments &&
                                  Object.keys(sector.Segments)?.map(
                                    (segmentKey) => {
                                      const segment =
                                        sector.Segments?.[Number(segmentKey)];
                                      const status = segment?.Status || 0;
                                      // https://github.com/slowlydev/f1-dash/blob/5cba2737cf0a3d92084bad7287695d6087a79277/dash/src/components/driver/DriverMiniSectors.tsx#L56
                                      return (
                                        <div
                                          key={
                                            'sector_' +
                                            i +
                                            '_segment_' +
                                            segmentKey
                                          }
                                          data-status={status}
                                          className={clsx('h-2 w-3 rounded', {
                                            'bg-yellow-400':
                                              status === 2048 ||
                                              [2050, 2052].includes(status), // TODO unsure
                                            'bg-green-600': status === 2049,
                                            'bg-purple-600': status === 2051,
                                            'bg-blue-500': status === 2064,
                                            'bg-zinc-700': status === 0,
                                          })}
                                        />
                                      );
                                    },
                                  )}
                              </div>
                            </div>
                          );
                        })}

                        {/*
                          '0': 'RPM',
                          '2': "Speed",
                          '3': "Gear",
                          '4': "Throttle",
                          '5': "Brake",
                          '45': "DRS"
                        */}
                        {carStats?.Channels && (
                          <div className='flex'>
                            <p className='w-12 text-center leading-3'>
                              {carStats.Channels[2]}
                              <br />
                              <span className='text-xs'>kph</span>
                            </p>
                            <p className='w-12 text-center'>
                              {carStats.Channels[3]}
                            </p>
                            <div className='relative flex w-20 items-center justify-center'>
                              <div
                                className='absolute left-0 -z-10 h-10 bg-green-600'
                                style={{
                                  width: `${(carStats.Channels[4] / 100) * 100}%`,
                                }}
                              ></div>
                              <p>Throttle</p>
                            </div>
                            <div className='relative flex w-20 items-center justify-center'>
                              <div
                                className='absolute left-0 -z-10 h-10 bg-blue-500'
                                style={{
                                  width: `${(carStats.Channels[0] / 15000) * 100}%`,
                                }}
                              ></div>
                              <p>RPM</p>
                            </div>
                            <div className='relative flex w-20 items-center justify-center'>
                              <div
                                className='absolute left-0 -z-10 h-10 bg-red-600'
                                style={{
                                  width: `${Math.min((carStats.Channels[5] / 1) * 100, 100)}%`,
                                }}
                              ></div>
                              <p>Brake</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value='stints-tyres'>
                    {/* Driver Stints */}
                    {driverStint && (
                      <div className='flex gap-1'>
                        {driverStint?.Stints.map((stint) => (
                          <p
                            key={
                              'driver_' + driver + '_stint_' + stint.LapNumber
                            }
                          >
                            {stint.New === 'true' && 'New'} {stint.Compound} |{' '}
                            {stint.LapTime} | {stint.StartLaps} -{' '}
                            {stint.TotalLaps}
                          </p>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value='best-times'>
                    {/* Driver Stints */}
                    {driverBests && (
                      <div className='grid grid-cols-4 gap-8 px-8'>
                        <div className='flex gap-2'>
                          <p className='w-20 border-r pr-2 text-right'>
                            {driverBests.PersonalBestLapTime.Value}
                          </p>

                          <p>L{driverBests.PersonalBestLapTime.Lap}</p>
                        </div>
                        <div className='flex gap-2'>
                          <p className='w-20 border-r pr-2 text-right'>
                            {driverBests.BestSectors[0].Value}
                          </p>

                          <p>
                            {driverBests.BestSectors[0].Position +
                              positionEnding(
                                driverBests.BestSectors[0].Position,
                              )}
                          </p>
                        </div>
                        <div className='flex gap-2'>
                          <p className='w-20 border-r pr-2 text-right'>
                            {driverBests.BestSectors[1].Value}
                          </p>

                          <p>
                            {driverBests.BestSectors[1].Position +
                              positionEnding(
                                driverBests.BestSectors[1].Position,
                              )}
                          </p>
                        </div>
                        <div className='flex gap-2'>
                          <p className='w-20 border-r pr-2 text-right'>
                            {driverBests.BestSectors[2].Value}
                          </p>

                          <p>
                            {driverBests.BestSectors[2].Position +
                              positionEnding(
                                driverBests.BestSectors[2].Position,
                              )}
                          </p>
                        </div>

                        {/* TODO: BEST SPEEDS */}
                      </div>
                    )}
                  </TabsContent>
                </div>
              );
            })}
          </div>
        )}
      </Tabs>

      <div className='grid md:grid-cols-4'>
        {raceControlMessages && raceControlMessages.Messages && (
          <div className='col-span-2'>
            <DataLog title='Race Control Messages'>
              {raceControlMessages.Messages.map((msg: RaceControlMessage) => {
                return (
                  <DataLogMessage key={msg.Message + msg.Utc} date={msg.Utc}>
                    <p className='font-bold'>{msg.Message}</p>
                  </DataLogMessage>
                );
              })}
            </DataLog>
          </div>
        )}
        {sessionData && sessionData.StatusSeries && (
          <DataLog title='Session Data'>
            {sessionData.StatusSeries.map((event) => {
              const title =
                'TrackStatus' in event
                  ? 'Track Status'
                  : 'SessionStatus' in event
                    ? 'Session Status'
                    : 'Unknown';
              const [date, val] = Object.values(event);
              return (
                <DataLogMessage key={event.TrackStatus + event.Utc} date={date}>
                  <p>
                    <span className='font-bold'>{title}</span>: {val}
                  </p>
                </DataLogMessage>
              );
            })}
          </DataLog>
        )}
        {weatherData && (
          <div className='border px-4 py-2'>
            <div className='mb-2'>
              <h3 className='text-xl'>Weather</h3>
              {sessionInfo && (
                <p className='text-sm'>
                  {sessionInfo.Meeting.Location},{' '}
                  {sessionInfo.Meeting.Country.Name}
                </p>
              )}
            </div>
            <p>Track: {weatherData?.TrackTemp}&deg;C</p>
            <p>Air: {weatherData?.TrackTemp}&deg;C</p>
            <hr />
            <p>Rainfall: {weatherData.Rainfall}</p>
            <p>Humidity: {weatherData.Humidity}</p>
            <p>Pressure: {weatherData.Pressure}</p>
            <p>
              Wind: {weatherData.WindSpeed} {weatherData.WindDirection}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default WebSocketDemo;

const DataLog = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  const logEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollTop = logEndRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <div className='flex h-[220px] flex-col border px-4 py-2'>
      <h3 className='mb-2 text-xl'>{title}</h3>
      <div ref={logEndRef} className='h-full overflow-scroll'>
        {children}
      </div>
    </div>
  );
};

const DataLogMessage = ({
  date,
  children,
}: {
  date: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='py-2 leading-4 not-last:border-b'>
      <p className='text-xs'>
        {new Date(date).toLocaleString(undefined, {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        })}
      </p>
      {children}
    </div>
  );
};
