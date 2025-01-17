import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const geocodeLocation = async (city: string, country: string) => {
  const MAPBOX_TOKEN =
    'pk.eyJ1Ijoiam9lbC1hbmdlbCIsImEiOiJjbTBiMWV3Y3YwM29zMmpzOGYwMzRnczJrIn0.Xe5m-NphtlcPF6WKdovTGQ'; // Replace with your token

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    `${city}, ${country}`,
  )}.json?access_token=${MAPBOX_TOKEN}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch geolocation data');
  }

  const data = await response.json();
  if (data.features && data.features.length > 0) {
    const { center } = data.features[0]; // [longitude, latitude]
    return { long: center[0], lat: center[1] };
  } else {
    throw new Error('Location not found');
  }
};
