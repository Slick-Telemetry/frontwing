import { SessionData, TranslateItem } from '@/generated/mirrorsTypes';
const track_status_mapping = {
  AllClear: '1',
  Yellow: '2',
  SCDeployed: '4',
  Red: '5',
  VSCDeployed: '6',
  VSCEnding: '7',
};

interface SessionDataFormat {
  TrackStatus: {
    Time: (Date | string)[];
    Status: (string | number)[];
    Message: string[];
  };
  SessionStatus: { Time: (Date | string)[]; Status: (string | number)[] };
}

export const translateMsg = (data: [string, TranslateItem, string]) => {
  const [cat, msg, td = ''] = data;

  // Session Data is added to track or session status
  if (cat === 'SessionData') {
    const data: SessionDataFormat = {
      TrackStatus: { Time: [], Status: [], Message: [] },
      SessionStatus: { Time: [], Status: [] },
    };

    if (
      (msg as SessionData)['StatusSeries'] &&
      typeof (msg as SessionData)['StatusSeries'] === 'object'
    ) {
      for (const entry of Object.values(
        (msg as SessionData)['StatusSeries'] || {},
      )) {
        //  convert timestamp to timedelta
        // let status_dt = null;
        const status_dt = entry['Utc'] ? new Date(entry['Utc']) : '';

        const status_timedelta = status_dt; // - config.startDate;

        // Add track status or session status
        if (Object.keys(entry).includes('TrackStatus')) {
          let status_value = entry['TrackStatus'];

          // convert to numeric system used by the api
          if (typeof status_value !== 'number') {
            status_value =
              track_status_mapping[
                status_value as keyof typeof track_status_mapping
              ];
          }

          data['TrackStatus']['Time'].push(status_timedelta);
          data['TrackStatus']['Status'].push(status_value);
          // data["TrackStatus"]["Message"].push("");
        } else if (Object.keys(entry).includes('SessionStatus')) {
          data['SessionStatus']['Time'].push(status_timedelta);
          if (entry['SessionStatus']) {
            data['SessionStatus']['Status'].push(entry['SessionStatus']);
          }
        }
      }
    }
    return data;
  }

  // If data is not from TrackStatur or SessionStatus hub
  if (!['TrackStatus', 'SessionStatus'].includes(cat)) {
    // add to category or create category
    return [td, msg];
  }
};
