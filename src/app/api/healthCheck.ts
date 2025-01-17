export const checkServerHealth = async () => {
  const response = await fetch('http://localhost:8080/healthz');
  if (!response.ok) {
    throw new Error('Server not healthy');
  }
  return 'connected';
};
