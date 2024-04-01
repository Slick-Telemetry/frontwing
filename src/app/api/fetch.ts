import { serverUrl } from '@/lib/constants';

export const fetchAPI = async (endpoint: string) => {
  // Headers for authorization
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
    },
  };

  // Fetch from server
  const data = await fetch(`${serverUrl}/${endpoint}`, { ...options })
    .then(
      (res) => {
        // Response is not successful
        if (!res.ok) {
          throw new Error('Not 2xx response', { cause: res });
        }

        // Success parse data
        return res.json();
      },
      // Catch initial fetch error
      (err) => {
        throw new Error('Server not connecting', { cause: err });
      },
    )
    // Return parsed data
    .then((data) => data)
    // Catch and handle errors from above
    .catch((err) => {
      if (typeof err.cause.json === 'function') return err.cause.json();

      err.cause;
    });

  return data;
};
