import { Box } from '@/components/Box';
import { Flex } from '@/components/Flex';
import { Stack } from '@/components/Stack';
import { Link, Text } from '@/components/Text';
import {
  WeatherData,
  weatherDataMachine,
  WeatherDataService,
} from '@/machines/weather-data-machine';
import { styled } from '@/stitches.config';
import { PATHS } from '@utils/constants/paths.constants';
import { useActor, useInterpret } from '@xstate/react';
import isUndefined from 'lodash/fp/isUndefined';
import Image from 'next/image';
import React from 'react';

function tempText(temp: number | undefined): string {
  return isUndefined(temp) ? 'XX' : Math.round(temp).toString();
}

function WeatherIcon({
  description,
  icon,
}: Omit<WeatherData, 'temp'>): JSX.Element {
  return icon ? (
    <Image
      src={`https://openweathermap.org/img/wn/${icon}.png`}
      width='25px'
      height='25px'
      alt={description ?? 'weather icon'}
    />
  ) : (
    <Box css={{ display: 'grid', placeItems: 'center', width: 25 }}>
      <Box
        css={{
          borderRadius: '$round',
          height: 15,
          width: 15,
          backgroundColor: '$text1',
        }}
      />
    </Box>
  );
}

const formatter = new Intl.DateTimeFormat('en', {
  timeZone: 'America/New_York',
  timeStyle: 'short',
});
function Time(): JSX.Element {
  const [currentTime, setTime] = React.useState<string>('00:00XX');

  React.useEffect(() => {
    const tick = setInterval(() => {
      const now = new Date().getTime();
      const dcTime = formatter.format(now);
      setTime(dcTime);
    }, 1000);

    return () => clearInterval(tick);
  }, []);
  return (
    <Text size='1' as='time'>
      {currentTime}
    </Text>
  );
}

function Weather(): JSX.Element | null {
  const weatherDataService: WeatherDataService =
    useInterpret(weatherDataMachine);
  const [current, send] = useActor(weatherDataService);

  // Fetch weather data on mount
  React.useEffect(() => {
    send('FETCH');
  }, [send]);

  const weatherUI = React.useMemo(() => {
    const { data } = current.context;
    switch (true) {
      case current.matches('idle.noError.hasData'): {
        const { description, icon, temp } = data!;
        return (
          <>
            <WeatherIcon description={description} icon={icon} />
            <Text size='1'>{tempText(temp)}&deg;F</Text>
          </>
        );
      }
      case current.matches('idle.errored'): {
        return (
          <Text size='1' css={{ color: '$tomato9' }}>
            weather data errored
          </Text>
        );
      }
      case current.matches('fetching'): {
        return <Text size='1'>loading...</Text>;
      }
      default: {
        return null;
      }
    }
  }, [current]);

  return weatherUI;
}

const Grid = styled('footer', {
  d: 'grid',
  gridTemplateAreas: ` 'a b'
                       'c d'
                     `,
  gtc: 'repeat(min-content, 1fr)',
  columnGap: '$2',
  rowGap: '$3',
  pb: '$3',
  zIndex: 1,
  ai: 'end',
  '@bp3': {
    gridTemplateAreas: `'a b c d'`,
    pb: '$6',
    columnGap: '$6',
    gtc: 'repeat(3, auto) 1fr',
  },
});

export function Footer(): JSX.Element {
  return (
    <Grid>
      <Stack
        gap='1'
        css={{
          gridArea: 'c',
          '@bp3': {
            gridArea: 'a',
          },
        }}
      >
        <Text size='1'>design and development</Text>
        <Text size='1'>&copy; Hunter Jennings 2021</Text>
      </Stack>
      <Stack
        gap='1'
        css={{
          ta: 'right',
          gridArea: 'b',
          '@bp3': {
            ta: 'left',
          },
          justifySelf: 'end',
        }}
      >
        <Time />
        <Text size='1'>Washington D.C.</Text>
      </Stack>
      <Flex
        css={{
          flexDirection: 'row',
          ai: 'center',
          gridArea: 'a',
          '@bp3': { gridArea: 'c' },
        }}
      >
        <Weather />
      </Flex>
      <Stack css={{ justifySelf: 'end' }} direction='row' gap='2' as='ul'>
        <li>
          <Link size='1' href={PATHS.github}>
            Gh
          </Link>
        </li>
        <li>
          <Link size='1' href={PATHS.linkedin}>
            Li
          </Link>
        </li>
        <li>
          <Link size='1' href={PATHS.twitter}>
            Tw
          </Link>
        </li>
      </Stack>
    </Grid>
  );
}
