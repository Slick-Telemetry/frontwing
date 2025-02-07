'use client';

import { useQuery } from '@apollo/client';
// import { point } from '@turf/turf';
import { useState } from 'react';
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  LineProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Payload } from 'recharts/types/component/DefaultLegendContent';

import { GET_DRIVER_STANDINGS } from '@/lib/queries';

import {
  GetDriverStandingsQuery,
  GetDriverStandingsQueryVariables,
} from '@/generated/types';

const season = 2024;

const lineTypes = ['solid', '3 3', '5 5', '10 5', '10 10'];

const getLineType = (index: number) => {
  return lineTypes[index % lineTypes.length];
};

const colorMap = new Map<string, number>();
const defaultOptions = {
  legendType: 'circle' as const,
  type: 'monotone' as const,
};
const getLineAttributes = (
  driver: string | null | undefined,
  standings: GetDriverStandingsQuery['driver_standings'],
): Omit<LineProps, 'ref'> => {
  const driverOptions = {
    ...defaultOptions,
    key: driver,
    dataKey: driver || 'Unknown Driver',
    type: 'monotone' as const,
  };

  const color = standings.find(
    (standing) => standing.driver?.abbreviation === driver,
  )?.driver?.driver_sessions[0].constructorByConstructorId?.color;

  if (!color) return driverOptions;

  if (!colorMap.has(color)) {
    colorMap.set(color, 0);
  } else {
    colorMap.set(color, colorMap.get(color)! + 1);
  }

  const lineType = getLineType(colorMap.get(color)!);

  return {
    ...driverOptions,
    stroke: `#${color}`,
    strokeDasharray: lineType,
  };
};

interface CustomLegendProps {
  payload?: Payload[];
  onClick: (value: string) => void;
  driverStandings: GetDriverStandingsQuery['driver_standings'];
}
const CustomLegend = ({
  payload,
  onClick,
  driverStandings,
}: CustomLegendProps) => {
  const groupedDrivers = payload?.reduce(
    (acc, entry) => {
      const driverAbbreviation = entry.value;
      const constructor = driverStandings.find(
        (standing) => standing.driver?.abbreviation === driverAbbreviation,
      )?.driver?.driver_sessions[0].constructorByConstructorId?.name;

      if (!constructor) return acc;
      if (!acc[constructor]) acc[constructor] = [];
      acc[constructor].push(entry);
      return acc;
    },
    {} as Record<string, Payload[]>,
  );

  return (
    <div className='grid grid-cols-10'>
      {groupedDrivers &&
        Object.entries(groupedDrivers).map(([constructor, drivers], index) => (
          <div
            key={constructor + index}
            className='flex flex-col text-center'
            style={{ color: `#${constructor}` }}
          >
            <div className='line-clamp-1 text-xs capitalize'>
              {constructor.replace(/_/g, ' ')}
            </div>
            {drivers.map((driver, idx) => (
              <div key={idx} onClick={() => onClick(driver.value)}>
                {driver.value}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

const StandingChart = ({
  driver_standings,
}: {
  driver_standings: GetDriverStandingsQuery['driver_standings'];
}) => {
  const [hiddenDrivers, setHiddenDrivers] = useState<string[]>([]);

  const rounds = Array.from(
    new Set(driver_standings.map((standing) => standing.round)),
  ).sort((a, b) => (a ?? 0) - (b ?? 0));

  const drivers = Array.from(
    new Set(driver_standings.map((standing) => standing.driver?.abbreviation)),
  );

  const chartData = rounds.map((round) => {
    const roundData: {
      round: number | null | undefined;
      [key: string]: number | null | undefined;
    } = { round };
    drivers.forEach((driver) => {
      if (!driver) return;
      const standing = driver_standings.find(
        (s) => s.round === round && s.driver?.abbreviation === driver,
      );
      roundData[driver] = standing ? Number(standing.points) : 0;
    });
    return roundData;
  });

  const handleLegendClick = (driver: string) => {
    setHiddenDrivers((prev) =>
      prev.includes(driver)
        ? prev.filter((p) => p !== driver)
        : [...prev, driver],
    );
  };

  return (
    <div className='container mx-auto'>
      <ResponsiveContainer width='100%' height={700}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 10, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <Legend
            verticalAlign='top'
            // width={600}
            wrapperStyle={{
              left: '50%',
              transform: 'translateX(-50%)',
              paddingBlock: '2rem',
            }}
            content={(props) =>
              CustomLegend({
                ...props,
                driverStandings: driver_standings,
                onClick: handleLegendClick,
              })
            }
          />
          <XAxis dataKey='round'>
            <Label
              style={{
                // textAnchor: 'middle',
                fontSize: '130%',
                fill: 'white',
              }}
              position='bottom'
              value='Round'
            />
          </XAxis>
          <YAxis domain={[0, 'dataMax + 20']}>
            <Label
              value='Points'
              position='insideLeft'
              angle={-90}
              className='fill-white text-2xl'
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip />
          {drivers.map((driver) => {
            return (
              <Line
                key={driver}
                hide={hiddenDrivers.includes(driver as string)}
                {...getLineAttributes(driver, driver_standings)}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DriverStanding = () => {
  const { data, error } = useQuery<
    GetDriverStandingsQuery,
    GetDriverStandingsQueryVariables
  >(GET_DRIVER_STANDINGS, {
    variables: { season: season },
  });

  if (error) return <p>Error loading data</p>;
  if (!data) return <p>Loading...</p>;

  return <StandingChart {...data} />;
};
