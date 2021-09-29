import { z } from 'zod';

const Clouds = z.object({
  all: z.number().optional(),
});

const Coord = z.object({
  lon: z.number().optional(),
  lat: z.number().optional(),
});

const Main = z.object({
  temp: z.number(),
  pressure: z.number().optional(),
  feels_like: z.number().optional(),
  humidity: z.number().optional(),
  temp_min: z.number().optional(),
  temp_max: z.number().optional(),
});

const Sys = z.object({
  type: z.number().optional(),
  id: z.number().optional(),
  message: z.number().optional(),
  country: z.string().optional(),
  sunrise: z.number().optional(),
  sunset: z.number().optional(),
});

const Weather = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

const Wind = z.object({
  speed: z.number().optional(),
  deg: z.number().optional(),
  gust: z.number().optional(),
});

export const OpenWeatherResponseZod = z.object({
  coord: Coord,
  weather: z.array(Weather),
  base: z.string(),
  main: Main,
  visibility: z.number(),
  wind: Wind,
  clouds: Clouds,
  dt: z.number(),
  sys: Sys,
  id: z.number(),
  timezone: z.number().optional(),
  name: z.string(),
  cod: z.number(),
});

export type OpenWeatherResponse = z.infer<typeof OpenWeatherResponseZod>;
