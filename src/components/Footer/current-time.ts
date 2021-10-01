import React from 'react';

const formatter = new Intl.DateTimeFormat('en', {
  timeZone: 'America/New_York',
  timeStyle: 'short',
});

export function useCurrentTimeInDC(): string {
  const [currentTime, setTime] = React.useState<string>('00:00XX');

  React.useEffect(() => {
    const tick = setInterval(() => {
      const now = new Date().getTime();
      const dcTime = formatter.format(now);
      setTime(dcTime);
    }, 1000);

    return () => clearInterval(tick);
  }, []);

  return currentTime;
}
