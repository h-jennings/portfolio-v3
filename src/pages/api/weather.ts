import {
  OpenWeatherResponse,
  OpenWeatherResponseZod,
  WeatherData,
} from '@/app/_utils/types/open-weather';
import { type NextApiRequest, type NextApiResponse } from 'next';

const API_URL = `https://api.openweathermap.org/data/2.5/weather?id=4781708&units=imperial&appid=${process.env.WEATHER_API_KEY}`;

export function mapResponseData(data: OpenWeatherResponse): WeatherData {
  const weather = data.weather[0];
  return {
    temp: data.main.temp,
    description: weather ? weather.description : undefined,
    icon: weather ? weather.icon : undefined,
  };
}

const weather = async (
  _req: NextApiRequest,
  res: NextApiResponse<WeatherData>,
) => {
  const response = await fetch(API_URL);
  const data = (await response.json()) as OpenWeatherResponse;
  const checked = OpenWeatherResponseZod.parse(data);
  const weatherData = mapResponseData(checked);

  res.status(200).json(weatherData);
};

export default weather;
