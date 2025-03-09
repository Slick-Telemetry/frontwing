export const checkServerHealth = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HASURA_URL}/healthz`,
    {
      headers: {
        skip_zrok_interstitial: 'true',
      },
    },
  );
  if (!response.ok) {
    throw new Error('Server not healthy');
  }
  return 'connected';
};
