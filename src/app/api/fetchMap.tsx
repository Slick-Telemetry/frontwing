'use client';

import { useEffect, useState } from 'react';

import { fetchEvents } from '@/app/api/fetchEvents';

const CircuitMap = () => {
  const [firstEvent, setFirstEvent] = useState(null);

  useEffect(() => {
    const getFirstEvent = async () => {
      const events = await fetchEvents();
      if (events.length > 0) {
        setFirstEvent(events[0]);
      }
    };

    getFirstEvent();
  }, []);
  return (
    <div>
      {firstEvent ? (
        <div>
          <h2>First Event</h2>
          <p>{JSON.stringify(firstEvent, null, 2)}</p>
        </div>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default CircuitMap;
