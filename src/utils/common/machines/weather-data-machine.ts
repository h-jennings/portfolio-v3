import {
  OpenWeatherResponse,
  OpenWeatherResponseZod,
} from '@utils/common/types/open-weather';
import axios from 'axios';
import { catchError, from, mergeMap, of } from 'rxjs';
import { ActorRefFrom } from 'xstate';
import { ZodError } from 'zod';
import { dataMachine } from './data-machine';

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=4140963&units=imperial&appid=${process.env.WEATHER_API_KEY}`;

export interface WeatherData {
  temp: number | undefined;
  icon: string | undefined;
  description: string | undefined;
}
export function mapResponseData(data: OpenWeatherResponse): WeatherData {
  return {
    temp: data?.main?.temp,
    description: data?.weather[0]?.description,
    icon: data?.weather[0]?.icon,
  };
}

export const weatherDataMachine = dataMachine<WeatherData>(
  'weather-data-machine',
).withConfig({
  services: {
    fetchData: (_context, _event) => {
      return from(axios.get<OpenWeatherResponse>(apiUrl)).pipe(
        mergeMap((res) => {
          // Check that schema matches
          const data = OpenWeatherResponseZod.parse(res.data);
          return of({ type: 'RECEIVE_DATA', data: mapResponseData(data) });
        }),
        catchError((err: Error | ZodError) => {
          if (err instanceof ZodError) {
            err.format();
            console.error(err);
          }
          return of({ type: 'ERROR', data: { message: err.message } });
        }),
      );
    },
  },
});

export type WeatherDataService = ActorRefFrom<typeof weatherDataMachine>;
