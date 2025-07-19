import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Dont show vercel observability in testing mode
export const VercelObservability = () => {
  if (process.env.TESTING === 'true') return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
};
