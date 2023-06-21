import { PATHS } from '@utils/common/constants/paths.constants';
import { WeatherData } from '@utils/common/types/open-weather';
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

const getWeather = async () => {
  // fetch weather data from open weather api, revalidate every 1min
  const response = await fetch(`${PATHS.base}/api/weather`, {
    next: { revalidate: 60 },
  });
  return (await response.json()) as WeatherData;
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
