import { ds } from '@/styles/ds.css';
import { grid } from '@/styles/primitives/grid.css';
import { stack } from '@/styles/primitives/stack.css';
import { text } from '@/styles/primitives/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { useQuery } from '@tanstack/react-query';
import { WeatherData } from '@utils/common/types/open-weather';
import clsx from 'clsx';
import Image from 'next/image';
import * as React from 'react';
import * as s from './Footer.css';

export const Footer = (): JSX.Element => {
  return (
    <footer
      className={sprinkles({
        paddingTop: '3xl',
        paddingBottom: { initial: 'm', bp1: 'xl' },
      })}
      style={{ gridArea: 'footer' }}
    >
      <div
        className={clsx(
          stack({
            orientation: 'horizontal',
            gap: '3xs',
          }),
          sprinkles({ paddingBottom: '2xl' }),
        )}
        role='separator'
      >
        <div className={s.dot} />
        <div className={s.dot} />
        <div className={s.dot} />
      </div>
      <div className={s.footer.wrapper}>
        <div
          className={clsx(
            stack({ gap: '2xs' }),
            sprinkles({ textAlign: 'left' }),
          )}
        >
          <Time />
          <span
            className={text({ leading: 'tight', size: '1' })}
            style={{ whiteSpace: 'nowrap' }}
          >
            Richmond, VA
          </span>
        </div>
        <div className={s.weather.wrapper}>
          <Weather />
        </div>
        <span
          className={clsx(
            text({ size: '1', leading: 'tight', color: '2' }),
            sprinkles({
              textAlign: { initial: 'center', bp1: 'right' },
            }),
          )}
          style={{ gridArea: 'c' }}
        >
          Always pushing.
        </span>
      </div>
    </footer>
  );
};

const Time = (): JSX.Element => {
  const [currentTime, setTime] = React.useState<{
    pretty: string;
    twentyFour: string;
  }>({ pretty: '00:00XX', twentyFour: '00:00' });

  React.useEffect(() => {
    const tick = setInterval(() => {
      const now = new Date().getTime();
      const dcTimePretty = formatter.format(now);
      const dcTimeTwentyFour = formatterTwentyFour.format(now);
      setTime({ pretty: dcTimePretty, twentyFour: dcTimeTwentyFour });
    }, 1000);

    return () => clearInterval(tick);
  }, []);
  return (
    <time
      className={text({ leading: 'tight', size: '1' })}
      dateTime={currentTime.twentyFour}
    >
      {currentTime.pretty}
    </time>
  );
};

const formatter = new Intl.DateTimeFormat('en', {
  timeZone: 'America/New_York',
  timeStyle: 'short',
});

const formatterTwentyFour = new Intl.DateTimeFormat('en', {
  timeZone: 'America/New_York',
  timeStyle: 'short',
  hour12: false,
});

const getWeather = async () => {
  const response = await fetch('/api/weather');
  return (await response.json()) as WeatherData;
};

const Weather = (): JSX.Element | null => {
  const { data, status } = useQuery({
    queryKey: ['Weather'],
    queryFn: getWeather,
    staleTime: 300000, // 5min,
  });

  const weatherUI = React.useMemo(() => {
    switch (status) {
      case 'success': {
        const { description, icon, temp } = data;
        return (
          <>
            <WeatherIcon description={description} icon={icon} />
            <span className={text({ leading: 'tight', size: '1' })}>
              {tempText(temp)}&deg;F
            </span>
          </>
        );
      }
      case 'error': {
        return (
          <span
            className={text({ size: '1', leading: 'tight' })}
            style={{ color: ds.theme.colors.tomato9 }}
          >
            weather data errored
          </span>
        );
      }
      case 'loading': {
        return (
          <span className={text({ size: '1', leading: 'tight' })}>
            loading...
          </span>
        );
      }
      default: {
        return null;
      }
    }
  }, [data, status]);

  return weatherUI;
};

function tempText(temp: number | undefined): string {
  return temp === undefined ? 'XX' : Math.round(temp).toString();
}

const WeatherIcon = ({
  description,
  icon,
}: Omit<WeatherData, 'temp'>): JSX.Element => {
  return icon ? (
    <Image
      src={`https://openweathermap.org/img/wn/${icon}.png`}
      width={25}
      aria-hidden
      height={25}
      alt={description ?? 'weather icon'}
    />
  ) : (
    <div
      className={clsx(grid({ center: true }))}
      aria-hidden
      style={{ width: 25 }}
    >
      <div
        className={clsx(
          sprinkles({ borderRadius: 'round', backgroundColor: 'text1' }),
        )}
        style={{ width: 15, height: 15 }}
      />
    </div>
  );
};
