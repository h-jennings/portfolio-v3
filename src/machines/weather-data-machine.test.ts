import { OpenWeatherResponse } from '@utils/types/open-weather';
import { mapResponseData, WeatherData } from './weather-data-machine';

const defaultData: OpenWeatherResponse = {
  coord: {
    lon: -77.0364,
    lat: 38.8951,
  },
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04n',
    },
  ],
  base: 'stations',
  main: {
    temp: 72.21,
    feels_like: 72.75,
    temp_min: 68.11,
    temp_max: 74.93,
    pressure: 1010,
    humidity: 77,
  },
  visibility: 10000,
  wind: {
    speed: 1.01,
    deg: 277,
    gust: 7,
  },
  clouds: {
    all: 75,
  },
  dt: 1632873417,
  sys: {
    type: 2,
    id: 2007789,
    country: 'US',
    sunrise: 1632826885,
    sunset: 1632869753,
  },
  timezone: -14400,
  id: 4140963,
  name: 'Washington D.C.',
  cod: 200,
};

describe('mapResponseData', () => {
  test('Happy Path', () => {
    const expectation: WeatherData = {
      temp: 72.21,
      icon: '04n',
      description: 'broken clouds',
    };
    const transformed = mapResponseData(defaultData);
    expect(transformed).toEqual(expectation);
  });
  test('Handles undefined', () => {
    const expectation: WeatherData = {
      temp: undefined,
      icon: undefined,
      description: undefined,
    };
    const input: OpenWeatherResponse =
      undefined as unknown as OpenWeatherResponse;
    const transformed = mapResponseData(input);
    expect(transformed).toEqual(expectation);
  });
  test('Handles undefined value', () => {
    const expectation: WeatherData = {
      temp: undefined,
      icon: '04n',
      description: 'broken clouds',
    };
    const input: OpenWeatherResponse = {
      ...defaultData,
      main: {
        ...defaultData.main,
        temp: undefined as unknown as number,
      },
    };
    const transformed = mapResponseData(input);
    expect(transformed).toEqual(expectation);
  });
  test('Handles undefined property', () => {
    const expectation: WeatherData = {
      temp: undefined,
      icon: '04n',
      description: 'broken clouds',
    };
    const input: OpenWeatherResponse = {
      ...defaultData,
      main: {} as any,
    };
    const transformed = mapResponseData(input);
    expect(transformed).toEqual(expectation);
  });
});
