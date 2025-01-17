'use client';

import { useQuery } from '@apollo/client';
import { MapPin } from 'lucide-react';
import React, { Fragment, useEffect, useState } from 'react';
import Map, { Layer, Marker, Popup, Source } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import { GET_SEASON_EVENTS_SIMPLE } from '@/lib/queries';
import { geocodeLocation } from '@/lib/utils';

import {
  GetSeasonEventsSimpleQuery,
  GetSeasonEventsSimpleQueryVariables,
} from '@/generated/types';

// Replace with your Mapbox access token
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoiam9lbC1hbmdlbCIsImEiOiJjbTBiMWV3Y3YwM29zMmpzOGYwMzRnczJrIn0.Xe5m-NphtlcPF6WKdovTGQ';

type Event = GetSeasonEventsSimpleQuery['events'][0];

interface SimpleEvents extends Event {
  lat: number;
  long: number;
}

const WorldMap = () => {
  const { data } = useQuery<
    GetSeasonEventsSimpleQuery,
    GetSeasonEventsSimpleQueryVariables
  >(GET_SEASON_EVENTS_SIMPLE, {
    variables: { year: 2024 },
  });
  const [locations, setLocations] = useState<SimpleEvents[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<SimpleEvents | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        if (!data) return;
        const locationsWithCoords = await Promise.all(
          data.events.map(async (event) => {
            if (event.location && event.country)
              try {
                const coords = await geocodeLocation(
                  event.location,
                  event.country,
                );
                return { ...event, ...coords };
              } catch (err) {
                if (err) return null;
              }
          }),
        );

        // Filter out events that couldn't be geocoded
        setLocations(
          locationsWithCoords.filter(
            (loc): loc is SimpleEvents => loc !== null,
          ),
        );
      } catch (err) {
        if (err) return null;
      }
    };

    fetchCoordinates();
  }, [data]);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Map
        initialViewState={{
          longitude: 0,
          latitude: 20,
          zoom: 2,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle='mapbox://styles/joel-angel/cm0mcld6300b901qy5715btg6' // Use any Mapbox style
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {locations.map((event, i) => (
          <Fragment key={event.name}>
            <Marker
              key={event.name}
              longitude={event.long}
              latitude={event.lat}
              onClick={() => setSelectedEvent(event)}
              scale={2}
            >
              {/* Custom marker */}
              <div style={{ cursor: 'pointer' }}>
                <MapPin fill='red' />
              </div>
            </Marker>
            {i > 0 && (
              <Source
                id={event.name}
                type='geojson'
                data={{
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: [
                      [event.long, event.lat],
                      [locations[i - 1].long, locations[i - 1].lat],
                    ],
                  },
                }}
              >
                <Layer
                  id={event.name || 'line'}
                  type='line'
                  source={event.name || 'line-source'}
                  paint={{
                    'line-color': '#FF0000', // Line color
                    'line-width': 2, // Line width
                  }}
                />
              </Source>
            )}
          </Fragment>
        ))}

        {selectedEvent && (
          <Popup
            longitude={selectedEvent.long}
            latitude={selectedEvent.lat}
            onClose={() => setSelectedEvent(null)}
            closeOnClick={false}
            closeButton={false}
            closeOnMove
            anchor='top'
            className='text-center text-black'
          >
            <p>Round {selectedEvent.round_number}</p>
            <strong>{selectedEvent.name}</strong>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default WorldMap;
