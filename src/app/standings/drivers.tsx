'use client';

import { useQuery } from '@apollo/client';
// import { point } from '@turf/turf';
import { useState } from 'react';
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { GET_DRIVER_STANDINGS } from '@/lib/queries';

import { MultiSelect } from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  GetDriverStandingsQuery,
  GetDriverStandingsQueryVariables,
} from '@/generated/types';

import { formatDriverChartData } from './utils';

const season = 2024;
const strokeDashArray = ['solid', '3 3', '5 5'];

interface ChartDataProps {
  round: number;
  [driverAbbreviation: string]: number;
}

interface ConstructorProps {
  name: string;
  color?: string | null;
  drivers: string[];
}

export interface ChartProps {
  chart: ChartDataProps[];
  constructors: ConstructorProps[];
}

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
  const driverData = formatDriverChartData(data);

  return <StandingChart {...driverData} />;
};

const StandingChart = ({ chart, constructors }: ChartProps) => {
  const [selectedSeason, _setSeason] = useState('2024');
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>(
    constructors.map((c) => c.drivers?.map((d) => d)).flat(),
  );
  const [selectedConstructor, setSelectedConstructor] = useState<string[]>(
    constructors.map((c) => c.name),
  );

  const handleConstructorSelect = (val: string[]) => {
    const activeConstructors = constructors.filter((c) => val.includes(c.name));
    const activeDrivers = activeConstructors
      .map((c) => c.drivers?.map((d) => d))
      .flat();

    setSelectedConstructor(val);
    setSelectedDrivers(activeDrivers);
  };

  const handleDriverSelect = (val: string[]) => {
    // IF no drivers from constructor remove constructor
    const activeConstructors = constructors.filter((c) => {
      // Check if val includes all drivers
      return c.drivers.some((d) => val.includes(d));
    });

    // Update constructors
    setSelectedConstructor(activeConstructors.map((c) => c.name));

    setSelectedDrivers(val);
  };

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-5 gap-4'>
        <div className='grid w-full'>
          <label>Select Season</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={selectedSeason} />
            </SelectTrigger>
            <SelectContent>
              {['2024'].map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='col-span-2 grid w-full'>
          <label>Select Drivers</label>

          <MultiSelect
            key={selectedDrivers.length}
            options={constructors
              .map((c) => c.drivers?.map((d) => ({ label: d, value: d })))
              .flat()}
            onValueChange={handleDriverSelect}
            defaultValue={selectedDrivers}
            placeholder='Select Drivers'
            variant='inverted'
            maxCount={3}
          />
        </div>

        <div className='col-span-2 grid w-full'>
          <label>Select Constructors</label>
          <MultiSelect
            key={selectedConstructor.length}
            options={constructors.map((c) => ({
              label: c.name,
              value: c.name,
            }))}
            onValueChange={handleConstructorSelect}
            defaultValue={selectedConstructor}
            placeholder='Select Constructors'
            variant='inverted'
            maxCount={2}
          />
        </div>
      </div>
      <ResponsiveContainer width='100%' height={700}>
        <LineChart
          data={chart.sort((a, b) => a.round - b.round)}
          margin={{ top: 5, right: 30, left: 10, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray='3 6' />
          {/* <Legend
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
          /> */}
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
          <Tooltip position={{ x: 100, y: 150 }} isAnimationActive={false} />
          {constructors.map((c) => {
            return c.drivers?.map((d, i) => (
              <Line
                key={d}
                legendType={'circle' as const}
                dataKey={d || 'Unknown Driver'}
                type={'monotone' as const}
                hide={
                  !selectedConstructor.includes(c.name) ||
                  !selectedDrivers.includes(d)
                }
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
