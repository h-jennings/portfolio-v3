import { styled } from '@/stitches.config';
import { Box } from '@common/components/Box';
import { Flex } from '@common/components/Flex';
import { Grid } from '@common/components/Grid';
import { Stack } from '@common/components/Stack';
import { Text } from '@common/components/Text';
import {
  WeatherData,
  weatherDataMachine,
  WeatherDataService,
} from '@common/machines/weather-data-machine';
import { useActor, useInterpret } from '@xstate/react';
import isUndefined from 'lodash/fp/isUndefined';
import Image from 'next/image';
import * as React from 'react';

export const Footer = (): JSX.Element => {
  return (
    <Box as='footer' css={{ pt: '$3xl', pb: '$m', '@bp1': { pb: '$xl' } }}>
      <Stack
        css={{ jc: 'center', pb: '$2xl' }}
        direction='row'
        gap='3xs'
        role='separator'
      >
        <Dot />
        <Dot />
        <Dot />
      </Stack>
      <Wrapper align='end' gap='s' gapY={{ '@initial': 'xl', '@bp1': 's' }}>
        <Stack
          gap='2xs'
          css={{
            ta: 'left',
          }}
        >
          <Time />
          <Text leading='tight' css={{ whiteSpace: 'nowrap' }} size='1'>
            Washington D.C.
          </Text>
        </Stack>
        <Flex
          direction='row'
          align='center'
          css={{ justifySelf: 'end', '@bp1': { justifySelf: 'start' } }}
        >
          <Weather />
        </Flex>
        <Text
          size='1'
          leading='tight'
          css={{
            color: '$slate9',
            ta: 'center',
            gridArea: 'c',
            '@bp1': { ta: 'right' },
          }}
        >
          Always pushing.
        </Text>
      </Wrapper>
    </Box>
  );
};

const Dot = styled('div', {
  backgroundColor: '$slate11',
  width: 2,
  height: 2,
  borderRadius: '$round',
});

const Wrapper = styled(Grid, {
  width: '$full',
  gridTemplateAreas: `'a b'
                      'c c'`,
  gridTemplateColumns: 'repeat(2, 1fr)',
  '@bp1': {
    gridTemplateAreas: `'a b c'`,
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
});

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
    <Text leading='tight' size='1' dateTime={currentTime.twentyFour} as='time'>
      {currentTime.pretty}
    </Text>
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

const Weather = (): JSX.Element | null => {
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
            <Text leading='tight' size='1'>
              {tempText(temp)}&deg;F
            </Text>
          </>
        );
      }
      case current.matches('idle.errored'): {
        return (
          <Text size='1' leading='tight' css={{ color: '$tomato9' }}>
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
};

function tempText(temp: number | undefined): string {
  return isUndefined(temp) ? 'XX' : Math.round(temp).toString();
}

const WeatherIcon = ({
  description,
  icon,
}: Omit<WeatherData, 'temp'>): JSX.Element => {
  return icon ? (
    <Image
      src={`https://openweathermap.org/img/wn/${icon}.png`}
      width='25px'
      aria-hidden
      height='25px'
      alt={description ?? 'weather icon'}
    />
  ) : (
    <Grid aria-hidden center style={{ width: 25 }}>
      <Box
        css={{
          borderRadius: '$round',
          height: 15,
          width: 15,
          backgroundColor: '$text1',
        }}
      />
    </Grid>
  );
};
