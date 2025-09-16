import * as echarts from 'echarts/core';
import { useEffect, useRef } from 'react';

export function useECharts(ref: React.RefObject<HTMLDivElement | null>) {
  const chartInstance = useRef<echarts.ECharts>(null);

  useEffect(() => {
    if (!ref.current || chartInstance.current) return;
    chartInstance.current = echarts.init(ref.current, 'dark');
    const resize = () => chartInstance.current?.resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [ref]);

  return chartInstance;
}
