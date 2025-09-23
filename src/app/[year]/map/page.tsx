'use client';
import { useQuery } from '@apollo/client/react';
import { use, useEffect, useState } from 'react';
import Map from 'react-map-gl/mapbox';

import { SprintBadge } from '@/components/sprint-badge';
import { Separator } from '@/components/ui/separator';

import { GET_SEASON_EVENTS } from '@/app/[year]/_components/schedule';
import { Legend } from '@/app/[year]/map/_components/legend';
import { MapContent, MapLoader } from '@/app/[year]/map/_components/map';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const initialView = {
  longitude: 0,
  latitude: 20,
  zoom: 2,
};

export default function MapPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = use(params);
  const { loading, error, data } = useQuery(GET_SEASON_EVENTS, {
    variables: { year: parseInt(year) },
  });
  const [mapLoading, setMapLoading] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(
    data?.schedule[0]?.event_name || null,
  );

  useEffect(() => {
    if (data?.schedule[0]?.event_name)
      setSelectedEvent(data.schedule[0]?.event_name);
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading map data.</div>;
  if (!data || data?.schedule?.length === 0)
    return <div>No events found for {year}.</div>;

  // Set focus on first locatoin

  return (
    <div className='px-4 py-4 lg:px-6'>
      <div className='flex flex-1 gap-4'>
        <div className='w-[300px]'>
          <Legend events={data?.schedule} selectEvent={setSelectedEvent} />
        </div>
        <div className='w-full rounded border'>
          <div className='px-4 py-2'>
            {data?.schedule
              .filter((evt) => evt.event_name === selectedEvent)
              .map((evt) => (
                <div className='flex justify-between' key={evt.event_name}>
                  <div>
                    <div className='flex items-center'>
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
                        Round {evt.round_number} of {data.schedule.length}
                      </p>
                      <Separator
                        orientation='vertical'
                        className='mx-2 data-[orientation=vertical]:h-4'
                      />
                      <SprintBadge format={evt.event_format} />
                    </div>
                    <h2 className='text-2xl font-bold'>{evt.event_name}</h2>
                    <p>
                      {evt.location}, {evt.country}
                    </p>
                  </div>
                  <div>Potential Results</div>
                </div>
              ))}
          </div>
          <div className='h-[700px] w-full overflow-hidden rounded border-t'>
            <Map
              reuseMaps
              initialViewState={initialView}
              mapStyle='mapbox://styles/mapbox/standard-satellite' // Use any Mapbox style
              mapboxAccessToken={MAPBOX_TOKEN}
              projection={{ name: 'globe' }}
              onLoad={() => setMapLoading(false)}
            >
              {!mapLoading && (
                <MapContent
                  selectedEvent={selectedEvent}
                  onClickAction={setSelectedEvent}
                />
              )}
            </Map>
            <MapLoader loading={mapLoading} />
            {/* <WorldMap /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
