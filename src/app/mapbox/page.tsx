'use client';

import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { Earth } from 'lucide-react';
import React, { Fragment, useState } from 'react';
import Map from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import { GET_SEASON_EVENTS_SIMPLE } from '@/lib/queries';
import { getColor } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';

import {
  GetSeasonEventsSimpleQuery,
  GetSeasonEventsSimpleQueryVariables,
} from '@/generated/types';

import { ConnectionLine } from './ConnectionLine';
import { Legend } from './Legend';
import { MapMarker } from './Marker';
import { MapPopup, PrevNextButtons } from './Popup';

export type Event = GetSeasonEventsSimpleQuery['events'][0];

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const initialView = {
  longitude: 0,
  latitude: 20,
  zoom: 2,
};

const WorldMap = () => {
  const { data, error } = useQuery<
    GetSeasonEventsSimpleQuery,
    GetSeasonEventsSimpleQueryVariables
  >(GET_SEASON_EVENTS_SIMPLE, {
    variables: { year: 2024 },
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  // We custom load state for map to load
  // This prevents issues rending the custom line layers
  const [loading, setLoading] = useState(true);

  if (error) return <ServerPageError />;

  const handleSelectEvent = (event: Event) => setSelectedEvent(event);

  // Previous event navigation for popup
  const handlePreviousClick = () => {
    if (data && selectedEvent) {
      const previousEvent = data.events.find(
        (e) => e.round_number === (selectedEvent.round_number as number) - 1,
      );
      setSelectedEvent(previousEvent as Event);
    }
  };

  const handleNextClick = () => {
    if (data && selectedEvent) {
      const nextEvent = data.events.find(
        (e) => e.round_number === (selectedEvent.round_number as number) + 1,
      );
      setSelectedEvent(nextEvent as Event);
    }
  };

  return (
    <div className='relative flex h-[600px] w-full items-center justify-center'>
      <Map
        initialViewState={initialView}
        mapStyle='mapbox://styles/mapbox/standard-satellite' // Use any Mapbox style
        mapboxAccessToken={MAPBOX_TOKEN}
        projection={{ name: 'globe' }}
        onLoad={() => setLoading(false)}
      >
        {/* Legend */}
        {data && <Legend events={data.events} />}

        {/* Markers */}
        {data?.events.map((event, i) => {
          const color = getColor(event.date);
          return (
            <Fragment key={event.name}>
              <MapMarker
                event={event}
                color={color}
                selectEvent={handleSelectEvent}
              />

              {/* Map needs to load first */}
              {!loading && (
                <ConnectionLine
                  event={event}
                  color={color}
                  prevEvent={data.events[i - 1]}
                />
              )}
            </Fragment>
          );
        })}

        {/* Popup */}
        {selectedEvent && (
          <MapPopup
            event={selectedEvent}
            handleClose={() => setSelectedEvent(null)}
          >
            {/* Prev and Next Event Buttons */}
            {data && (
              <PrevNextButtons
                prevLocation={
                  data.events[(selectedEvent.round_number as number) - 2]
                    ?.location
                }
                nextLocation={
                  data.events[selectedEvent.round_number as number]?.location
                }
                handlePrev={handlePreviousClick}
                handleNext={handleNextClick}
              />
            )}
          </MapPopup>
        )}
      </Map>
      <div
        className={clsx(
          'pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-black transition-opacity duration-400',
          loading ? 'opacity-100' : 'opacity-0',
        )}
      >
        <Earth
          size={48}
          absoluteStrokeWidth={true}
          className={
            loading ? 'animate-[ping_1.5s_ease-out_infinite]' : 'animate-none'
          }
        />
      </div>
    </div>
  );
};

export default WorldMap;
