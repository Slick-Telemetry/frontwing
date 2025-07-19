import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const Vercel = () => {
  if (process.env.TESTING === 'true') return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
};
