import { bearerToken, serverUrl } from '@/lib/constants';

export const fetchAPI = async (endpoint: string) => {
  // Headers for authorization
  const options = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  // Check if any fetching is in queue

  // If so add to queue

  // Need mechanism to tell code to go to next fetch

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

      return err.cause;
    });

  return data;
};
