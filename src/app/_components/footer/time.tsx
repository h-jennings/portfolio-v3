'use client';
import { css } from 'ds/css';
import * as React from 'react';

const Time = () => {
  const now = new Date().getTime();

  const [currentTime, setTime] = React.useState<{
    pretty: string;
    twentyFour: string;
  }>(() => {
    return {
      pretty: formatPretty(now),
      twentyFour: formatTwentyFour(now),
    };
  });

  React.useEffect(() => {
    const tick = setInterval(() => {
      const now = new Date().getTime();
      setTime({ pretty: formatPretty(now), twentyFour: formatTwentyFour(now) });
    }, 1000);

    return () => clearInterval(tick);
  }, []);
  return (
    <time
      className={css({ textStyle: 'base', lineHeight: 'tight', fontSize: '1' })}
      dateTime={currentTime.twentyFour}
    >
      {currentTime.pretty}
    </time>
  );
};

const formatPretty = (date: number) => {
  return formatter.format(date);
};
const formatTwentyFour = (date: number) => {
  return formatterTwentyFour.format(date);
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

export default Time;
