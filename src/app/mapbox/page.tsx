'use client';

import { useQuery } from '@apollo/client';
import { Maximize2, Minimize2 } from 'lucide-react';
import React, { useState } from 'react';
import Map from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import { GET_SEASON_EVENTS_SIMPLE } from '@/lib/queries';

import {
  GetSeasonEventsSimpleQuery,
  GetSeasonEventsSimpleQueryVariables,
} from '@/generated/types';

import { MapMarker } from './Marker';
import { MapPopup } from './Popup';

// Replace with your Mapbox access token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const initialView = {
  longitude: 0,
  latitude: 20,
  zoom: 2,
};

export type Event = GetSeasonEventsSimpleQuery['events'][0];

const Legend = () => {
  const currDistance = 5000;
  const totalDistance = 10000;

  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return (
      <div className='absolute top-4 right-4 rounded border border-current bg-black p-2 text-base'>
        <Maximize2
          className='cursor-pointer'
          onClick={() => setHidden(false)}
        />
      </div>
    );
  }

  return (
    <div className='absolute top-4 right-4 grid gap-2 rounded border border-current bg-black p-2'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl'>2024 Season Map</h3>
        <Minimize2 className='cursor-pointer' onClick={() => setHidden(true)} />
      </div>

      <div className='h-2 w-full overflow-hidden rounded-full bg-white'>
        <div
          className='h-2 bg-blue-500'
          style={{ width: (currDistance / totalDistance) * 100 + '%' }}
        ></div>
      </div>

      <p>
        Distance: {currDistance} / {totalDistance} KM
      </p>
      <div className='flex gap-4'>
        <p>Current Event: Bahrain</p>
        <p>Next Event: Jeddah</p>
      </div>
      <p className='text-right text-xs'>*Distances are approximate</p>
    </div>
  );
};

const WorldMap = () => {
  const { data } = useQuery<
    GetSeasonEventsSimpleQuery,
    GetSeasonEventsSimpleQueryVariables
  >(GET_SEASON_EVENTS_SIMPLE, {
    variables: { year: 2024 },
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  if (loading && !data) {
    return <>Loading Map...</>;
  }

  if (!data) {
    return <>No Data for map</>;
  }

  const handlePreviousClick = () => {
    if (selectedEvent && selectedEvent.round_number) {
      const previousEvent = data.events.find(
        (e) => e.round_number === (selectedEvent.round_number as number) - 1,
      );
      setSelectedEvent(previousEvent as Event);
    }
  };

  const handleNextClick = () => {
    if (selectedEvent && selectedEvent.round_number) {
      const nextEvent = data.events.find(
        (e) => e.round_number === (selectedEvent.round_number as number) + 1,
      );
      setSelectedEvent(nextEvent as Event);
    }
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Map
        initialViewState={initialView}
        mapStyle='mapbox://styles/mapbox/standard-satellite' // Use any Mapbox style
        mapboxAccessToken={MAPBOX_TOKEN}
        projection={{ name: 'globe' }}
        onLoad={() => setLoading(false)}
      >
        {/* Legend */}
        <Legend />

        {/* Markers */}
        {!loading &&
          data.events.map((event, i) => (
            <MapMarker
              key={event.name}
              event={event}
              selectEvent={(event) => setSelectedEvent(event)}
              prevEvent={i > 0 ? data.events[i - 1] : undefined}
            />
          ))}

        {/* Popup */}
        {selectedEvent && (
          <MapPopup
            event={selectedEvent}
            prevEvent={
              data.events[(selectedEvent.round_number as number) - 2] as Event
            }
            nextEvent={
              data.events[selectedEvent.round_number as number] as Event
            }
            handleClose={() => setSelectedEvent(null)}
            handlePrev={handlePreviousClick}
            handleNext={handleNextClick}
          />
        )}
      </Map>
    </div>
  );
};

export default WorldMap;
