import * as echarts from 'echarts';
// Import echarts-gl as a namespace
import React, { useEffect, useRef } from 'react';
import 'echarts-gl'; // This import is necessary for 3D globe

import { getColor } from '@/lib/utils';

import { MapEvent } from '@/generated/customTypes';

interface EChartsMapProps {
  events?: MapEvent[];
}

const EChartsMap = ({ events }: EChartsMapProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const myChartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    const initializeChart = async () => {
      if (chartRef.current) {
        myChartRef.current = echarts.init(chartRef.current);

        myChartRef.current.showLoading();

        // Load and register world map GeoJSON
        try {
          const response = await fetch('/geojson/world.json');
          const worldGeoJson = await response.json();
          echarts.registerMap('world', worldGeoJson);
        } catch {
          myChartRef.current.hideLoading();
          return;
        }

        const series: echarts.SeriesOption[] = [];

        if (events) {
          events.forEach((event, i) => {
            const latitude = event.sessions?.[0]?.circuit?.latitude;
            const longitude = event.sessions?.[0]?.circuit?.longitude;

            if (latitude && longitude) {
              // Add marker for each event
              series.push({
                name: event.name || 'Unknown Event',
                // @ts-expect-error ECharts parameters are complex and difficult to type precisely.
                type: 'scatter3D',
                coordinateSystem: 'geo3D',
                symbolSize: 8,
                itemStyle: {
                  color: getColor(event.date),
                  opacity: 1,
                },
                data: [[longitude, latitude, 0]],
              });

              // Add line to previous event
              const prevEvent = events[i - 1];
              if (prevEvent) {
                const prevLatitude = prevEvent.sessions?.[0]?.circuit?.latitude;
                const prevLongitude =
                  prevEvent.sessions?.[0]?.circuit?.longitude;

                if (prevLatitude && prevLongitude) {
                  series.push({
                    // @ts-expect-error ECharts parameters are complex and difficult to type precisely.
                    type: 'lines3D',
                    coordinateSystem: 'geo3D',
                    effect: {
                      show: true,
                      constantSpeed: 50,
                      trailWidth: 2,
                      trailLength: 0.1,
                      trailOpacity: 1,
                      spotFromTop: 100,
                    },
                    lineStyle: {
                      width: 2,
                      color: getColor(event.date),
                      opacity: 0.6,
                    },
                    data: [
                      [
                        [prevLongitude, prevLatitude, 0],
                        [longitude, latitude, 0],
                      ],
                    ],
                  });
                }
              }
            }
          });
        }

        const option: echarts.EChartsOption = {
          geo3D: {
            map: 'world',
            shading: 'realistic',
            silent: true,
            environment: '#333',
            realisticMaterial: {
              roughness: 0.8,
              metalness: 0,
            },
            postEffect: {
              enable: true,
            },
            light: {
              main: {
                intensity: 1,
                alpha: 30,
              },
              ambient: {
                intensity: 0,
              },
            },
            viewControl: {
              distance: 70,
              alpha: 89,
            },
            itemStyle: {
              color: '#000',
            },
            regionHeight: 0.5,
          },
          series: series,
        };

        myChartRef.current.setOption(option);
        myChartRef.current.hideLoading();
      }
    };

    initializeChart();

    return () => {
      if (myChartRef.current) {
        myChartRef.current.dispose();
      }
    };
  }, [events]);

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
};

export default EChartsMap;
