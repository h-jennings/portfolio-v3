import {
  OpenWeatherResponse,
  OpenWeatherResponseZod,
  WeatherData,
} from '@/app/_utils/types/open-weather';
import { css } from 'ds/css';
import { circle, grid } from 'ds/patterns';

export const Weather = async () => {
  const { icon, description, temp } = await getWeather();

  return (
    <>
      <WeatherIcon description={description} icon={icon} />
      <span
        className={css({
          textStyle: 'base',
          lineHeight: 'tight',
          fontSize: '1',
        })}
      >
        {tempText(temp)}&deg;F
      </span>
    </>
  );
};

const API_URL = `https://api.openweathermap.org/data/2.5/weather?id=4781708&units=imperial&appid=${process.env.WEATHER_API_KEY}`;
const getWeather = async () => {
  const response = await fetch(API_URL, {
    next: { revalidate: 60 },
  });
  const data = (await response.json()) as OpenWeatherResponse;
  const checked = OpenWeatherResponseZod.parse(data);
  return mapResponseData(checked);
};

const mapResponseData = (data: OpenWeatherResponse): WeatherData => {
  const weather = data.weather[0];
  return {
    temp: data.main.temp,
    description: weather ? weather.description : undefined,
    icon: weather ? weather.icon : undefined,
  };
};

const WeatherIcon = ({ description, icon }: Omit<WeatherData, 'temp'>) => {
  return icon != null ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      loading='lazy'
      src={`https://openweathermap.org/img/wn/${icon}.png`}
      width={25}
      aria-hidden
      height={25}
      alt={description ?? 'weather icon'}
    />
  ) : (
    <div
      className={grid({ placeItems: 'center' })}
      aria-hidden
      style={{ width: 25 }}
    >
      <div className={circle({ size: 15, bgColor: 'text1' })} />
    </div>
  );
};

const tempText = (temp: number | undefined) => {
  return temp === undefined ? 'XX' : Math.round(temp).toString();
};

export const WeatherError = () => {
  return (
    <span
      className={css({
        textStyle: 'base',
        lineHeight: 'tight',
        fontSize: '1',
        color: 'tomato9',
      })}
    >
      weather data errored
    </span>
  );
};

export const WeatherLoading = () => {
  return (
    <span
      className={css({
        textStyle: 'base',
        lineHeight: 'tight',
        fontSize: '1',
      })}
    >
      loading...
    </span>
  );
};
