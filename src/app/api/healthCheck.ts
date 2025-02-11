export const checkServerHealth = async () => {
  const response = await fetch('http://api.localhost/healthz');
  if (!response.ok) {
    throw new Error('Server not healthy');
  }
  return 'connected';
};
