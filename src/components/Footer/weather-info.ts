import {
  weatherDataMachine,
  WeatherDataService,
} from '@/machines/weather-data-machine';
import { useActor, useInterpret } from '@xstate/react';
import React from 'react';

export function useWeatherInfo() {
  const weatherDataService: WeatherDataService =
    useInterpret(weatherDataMachine);
  const [current, send] = useActor(weatherDataService);

  // Fetch weather data on mount
  React.useEffect(() => {
    send('FETCH');
  }, [send]);

  return current;
}
