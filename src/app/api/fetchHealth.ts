import { fetchAPI } from './fetch';

export const healthFetch = async (): Promise<boolean> => {
  return fetchAPI('health').then((data) => {
    return !!data;
  });
};
