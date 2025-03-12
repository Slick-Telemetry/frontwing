'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

import { DriverListEntry, LiveTimingResponse } from '@/generated/mirrorsTypes';

import { translateMsg } from './utils';

const useWebSocket = (url: string, token: string) => {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempted = useRef(false); // Ensures only one reconnect attempt

  useEffect(() => {
    // if (!token) return;

    const connectWebSocket = () => {
      // console.log('Connecting to WebSocket...');

      const socket = new WebSocket(`${url}`);
      wsRef.current = socket;

      socket.onopen = () => {
        // console.log('WebSocket connected');
        setIsConnected(true);
        reconnectAttempted.current = false; // Reset reconnect flag
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (Object.keys(data).length > 0) {
          setData(JSON.parse(event.data));
        }
      };

      socket.onerror = (_error) => {
        // console.error('WebSocket error', error);
      };

      socket.onclose = () => {
        // console.log('WebSocket disconnected');
        setIsConnected(false);

        // Attempt a single reconnect after 300ms, if not already attempted
        if (!reconnectAttempted.current) {
          reconnectAttempted.current = true;
          setTimeout(() => {
            // console.log('Attempting WebSocket reconnect...');
            connectWebSocket();
          }, 300);
        }
      };
    };

    connectWebSocket();

    return () => {
      wsRef.current?.close();
    };
  }, [url, token]);

  return { data, isConnected };
};

export default function TelemetryStream({ token }: { token: string }) {
  const [driverList, setDriverList] = useState<DriverListEntry[]>([]);

  const { data, isConnected } = useWebSocket('ws://0.0.0.0:9000', token) as {
    data: Record<string, LiveTimingResponse> | null;
    isConnected: boolean;
  };

  const sortedData = useMemo(() => {
    if (!data) return null;
    if (data.R) {
      const cats = Object.keys(data.R);
      cats.map((cat) => {
        const msg = data.R[cat as keyof typeof data.R];
        if (cat === 'DriverList') {
          // Sort the inner object by the value of 'Line'
          const sortedMsg = Object.entries(msg as DriverListEntry).sort(
            (a, b) => a[1].Line - b[1].Line,
          );

          setDriverList(sortedMsg.slice(0, -1).map((d) => d[1]));
          return;
        }
        return translateMsg([cat, msg, new Date().toISOString()]);
      });
    }
  }, [data]);

  if (!data) return <p>No data to display</p>;

  return (
    <div className='container'>
      <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <div className='rounded-lg border p-2'>
        <h2>Driver Lists</h2>
        <ul>
          {driverList &&
            driverList.map((data, i) => (
              <li key={i} className='text-sm'>
                {data.Tla}
              </li>
            ))}
        </ul>
      </div>
      {sortedData && <>Data Sorted</>}
    </div>
  );
}
