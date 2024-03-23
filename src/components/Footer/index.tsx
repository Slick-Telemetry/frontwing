import { fetchAPI } from '@/lib/helpers';

async function Footer() {
  const serverStatus = await fetchAPI('health');

  return (
    <div className='container min-h-24'>
      <p>Footer</p>
      <p>
        <b>Server Status:</b> {serverStatus.status || 'Offline'}
      </p>
    </div>
  );
}

export { Footer };
