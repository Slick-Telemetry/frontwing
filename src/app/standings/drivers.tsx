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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { GET_DRIVER_STANDINGS } from '@/lib/queries';

import {
  GetDriverStandingsQuery,
  GetDriverStandingsQueryVariables,
} from '@/generated/types';

const season = 2024;
const strokeDashArray = ['solid', '3 3', '5 5'];

interface CustomLegendProps {
  onClick: (value: string) => void;
  hiddenDrivers: string[];
  constructors: {
    name: string;
    color?: string | null;
    drivers: string[];
  }[];
}
const CustomLegend = ({
  onClick,
  hiddenDrivers,
  constructors,
}: CustomLegendProps) => {
  const handleConstructorClick = (
    constructor: CustomLegendProps['constructors'][number],
  ) => {
    constructor.drivers.map((driver) => {
      // TODO: handle situation where driver has already been clicked
      // Make both drivers same state
      onClick(driver);
    });
  };

  return (
    <div className='grid grid-cols-10'>
      {constructors.map((c) => (
        <div
          key={c.name}
          className='flex flex-col text-center'
          style={{ color: `#${c.color}` }}
        >
          <div
            className='line-clamp-1 text-xs capitalize'
            onClick={() => handleConstructorClick(c)}
          >
            {c.name.replace(/_/g, ' ')}
          </div>
          {c.drivers.map((driver, idx) => (
            <div
              key={idx}
              onClick={() => onClick(driver)}
              className={hiddenDrivers.includes(driver) ? 'line-through' : ''}
            >
              {driver}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const StandingChart = ({
  chart,
  constructors,
}: {
  chart: {
    round: number;
    [driverAbbreviation: string]: number;
  }[];
  constructors: {
    name: string;
    color?: string | null;
    drivers: string[];
  }[];
}) => {
  const [hiddenDrivers, setHiddenDrivers] = useState<string[]>([]);

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
          data={chart.sort((a, b) => a.round - b.round)}
          margin={{ top: 5, right: 30, left: 10, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray='3 6' />
          <Legend
            verticalAlign='top'
            // width={600}
            wrapperStyle={{
              left: '50%',
              transform: 'translateX(-50%)',
              paddingBlock: '2rem',
            }}
            content={() =>
              CustomLegend({
                constructors: constructors,
                hiddenDrivers: hiddenDrivers,
                onClick: handleLegendClick,
              })
            }
          />
          <XAxis dataKey='round'>
            <Label
              style={{
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
          <Tooltip
            wrapperStyle={{ border: '2px red solid', width: '300px' }}
            labelClassName='hidden'
            contentStyle={{ fontSize: '1rem' }}
          />
          {constructors.map((c) => {
            return c.drivers.map((d, i) => (
              <Line
                key={d}
                legendType={'circle' as const}
                dataKey={d || 'Unknown Driver'}
                type={'monotone' as const}
                hide={hiddenDrivers.includes(d)}
                stroke={`#${c.color}`}
                strokeDasharray={strokeDashArray[i]}
              />
            ));
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

  // Get list of drivers with constructor and color
  const formattedData = data.driver_standings.reduce(
    (acc, standing) => {
      const { chart, constructors } = acc;
      const { round } = standing; // If there's a valid driver abbreviation, assign their points
      const driverAbbrev = standing.driver?.abbreviation;
      const constructorName =
        standing.driver?.driver_sessions[0].constructorByConstructorId?.name ||
        'Unknown Driver';

      // Add chart data
      if (round && driverAbbrev) {
        const existingRoundIndex = chart.findIndex((dp) => dp.round === round);
        // Create round
        if (existingRoundIndex < 0) {
          chart.push({
            round: round,
            [driverAbbrev]: Number(standing.points) || 0,
          });
          // update round
        } else {
          chart[existingRoundIndex][driverAbbrev] =
            Number(standing.points) || 0;
        }
      }

      // Add constructor data
      if (constructorName && driverAbbrev) {
        const existingConstructorIndex = constructors.findIndex(
          (c) => c.name === constructorName,
        );

        // Constructor doesn't exists start from scratch
        if (existingConstructorIndex < 0) {
          constructors.push({
            name: constructorName,
            color:
              standing.driver?.driver_sessions[0].constructorByConstructorId
                ?.color,
            drivers: [driverAbbrev],
          });
        } else if (
          !constructors[existingConstructorIndex].drivers.includes(driverAbbrev)
        ) {
          constructors[existingConstructorIndex].drivers.push(driverAbbrev);
        }
      }

      return { chart: chart, constructors: constructors };
    },
    {
      chart: [],
      constructors: [],
    } as {
      chart: {
        round: number;
        [driverAbbreviation: string]: number;
      }[];
      constructors: {
        name: string;
        color?: string | null;
        drivers: string[];
      }[];
    },
  );

  return <StandingChart {...formattedData} />;
};
