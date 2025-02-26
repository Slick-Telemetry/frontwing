'use client';

import { useQuery } from '@apollo/client';
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  darkTheme,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import clsx from 'clsx';

import { GET_DRIVER_STANDINGS } from '@/lib/queries';

import {
  GetStandingsQuery,
  GetStandingsQueryVariables,
} from '@/generated/types';

type DriverStanding = GetStandingsQuery['drivers'][0]['driver_standings'][0];

export interface ChartDataFormat extends DriverStanding {
  driver?: string | null;
  abbreviation?: string | null;
  color?: string | null;
  constructor?: string | null;
}

export const Standings = () => {
  const { data, loading, error } = useQuery<
    GetStandingsQuery,
    GetStandingsQueryVariables
  >(GET_DRIVER_STANDINGS, { variables: { season: 2024 } });

  if (loading) return <p>Loading...</p>;
  if (error || !data?.drivers) return <p>Error...</p>;

  const drivers = data.drivers.filter((driver) => !!driver);

  const standings = drivers.map((driver) =>
    driver.driver_standings.map((ds) => ({
      ...ds,
      driver: driver?.full_name,
      abbreviation: driver?.abbreviation,
      color: driver?.driver_sessions?.[0]?.constructorByConstructorId?.color,
      constructor:
        driver?.driver_sessions?.[0]?.constructorByConstructorId?.name,
    })),
  );

  return (
    <div className='min-h-svh'>
      <CumulativeDriverStandings data={standings} />
    </div>
  );
};

// const legendGlyphSize = 15;
const accessors = {
  xAccessor: (d: ChartDataFormat) => d?.round || 0,
  yAccessor: (d: ChartDataFormat) => d?.points || 0,
};

export const CumulativeDriverStandings = ({
  data,
}: {
  data: ChartDataFormat[][];
}) => {
  return (
    <div>
      <XYChart
        theme={darkTheme}
        height={500}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear', domain: [0, 450] }}
      >
        <AnimatedAxis
          orientation='bottom'
          numTicks={data[0].length} // number of rounds
          label='Round #'
        />
        <AnimatedAxis orientation='left' label='Points' labelOffset={18} />
        <AnimatedGrid columns={false} />

        {data.map((standings) => (
          <AnimatedLineSeries
            key={standings[0].abbreviation || ''}
            dataKey={standings[0].abbreviation || ''}
            data={standings}
            colorAccessor={() => `#${standings[0].color || '000000'}`}
            {...accessors}
          />
        ))}

        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData }) => {
            if (!tooltipData) return;
            return (
              <div>
                {/* round */}
                <p className='text-lg'>
                  {tooltipData.nearestDatum &&
                    `Round: ${accessors.xAccessor(tooltipData.nearestDatum.datum as ChartDataFormat)}`}
                </p>
                {/* driver and points */}
                {tooltipData.datumByKey &&
                  Object.keys(tooltipData?.datumByKey)
                    .sort(
                      (a, b) =>
                        Number(
                          accessors.yAccessor(
                            tooltipData?.datumByKey[b].datum as ChartDataFormat,
                          ),
                        ) -
                        Number(
                          accessors.yAccessor(
                            tooltipData?.datumByKey[a].datum as ChartDataFormat,
                          ),
                        ),
                    ) // sort by points
                    .map((driver) => {
                      const result = tooltipData?.datumByKey[driver]
                        .datum as ChartDataFormat;
                      const active = tooltipData?.nearestDatum?.key === driver;
                      return (
                        <div
                          key={driver}
                          className={clsx(
                            'flex justify-between border-b border-gray-700 py-0.5',
                            !active && 'font-light opacity-80',
                            active && 'font-black underline',
                          )}
                        >
                          <em
                            style={{
                              color: `#${result.color}`,
                            }}
                          >
                            {driver}
                          </em>{' '}
                          {`${accessors.yAccessor(result)}`}
                        </div>
                      );
                    })}
              </div>
            );
          }}
        />
      </XYChart>
    </div>
  );
};

// const Legend = () => {
//   return (
//     <div className='flex w-full justify-center'>
//       <LegendOrdinal
//         // direction="row"
//         // itemMargin={5}
//         scale={ordinalColorScale}
//         labelFormat={(label) => `${label}`}
//       >
//         {(labels) => (
//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             {labels.map((label, i) => (
//               <LegendItem
//                 key={`legend-quantile-${i}`}
//                 margin='0 5px'
//                 onClick={() => {
//                   if (events) alert(`clicked: ${JSON.stringify(label)}`);
//                 }}
//               >
//                 <svg width={legendGlyphSize} height={legendGlyphSize}>
//                   <rect
//                     fill={label.value}
//                     width={legendGlyphSize}
//                     height={legendGlyphSize}
//                   />
//                 </svg>
//                 <LegendLabel align='left' margin='0 0 0 4px'>
//                   {label.text}
//                 </LegendLabel>
//               </LegendItem>
//             ))}
//           </div>
//         )}
//       </LegendOrdinal>
//     </div>
//   );
// };
