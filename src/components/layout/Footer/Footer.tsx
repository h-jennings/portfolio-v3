import { useCurrentTimeInDC } from '@/components/layout/Footer/use-current-time';
import { PATHS } from '@/constants/paths';
import { WeatherData } from '@/machines/weather-data-machine';
import { styled } from '@/stitches.config';
import isUndefined from 'lodash/fp/isUndefined';
import Image from 'next/image';
import React from 'react';
import { Box } from '../../primitives/Box';
import { Flex } from '../../primitives/Flex';
import { Link } from '../../primitives/link';
import { Stack } from '../../primitives/Stack';
import { Text } from '../../primitives/text';
import { useWeatherInfo } from './use-weather-info';

function tempText(temp: number | undefined): string {
  return isUndefined(temp) ? 'XX' : Math.round(temp).toString();
}

const FooterText = styled(Text, {
  fontSize: '$1',
});

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

const Grid = styled('footer', {
  d: 'grid',
  gridTemplateAreas: ` 'a b'
                       'c d'
                     `,
  gtc: 'repeat(2, 1fr)',
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
  const currentTime = useCurrentTimeInDC();

  const current = useWeatherInfo();

  const weatherUI = React.useMemo(() => {
    const { data } = current.context;
    switch (true) {
      case current.matches('idle.noError.hasData'): {
        const { description, icon, temp } = data!;
        return (
          <>
            <WeatherIcon description={description} icon={icon} />
            <FooterText>{tempText(temp)}&deg;F</FooterText>
          </>
        );
      }
      case current.matches('idle.errored'): {
        return (
          <FooterText css={{ color: '$tomato9' }}>
            weather data errored
          </FooterText>
        );
      }
      case current.matches('fetching'): {
        return <FooterText>loading...</FooterText>;
      }
      default: {
        return null;
      }
    }
  }, [current]);

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
        <FooterText>design and development</FooterText>
        <FooterText>&copy; Hunter Jennings 2021</FooterText>
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
        <FooterText as='time'>{currentTime}</FooterText>
        <FooterText>Washington D.C.</FooterText>
      </Stack>
      <Flex
        css={{
          flexDirection: 'row',
          ai: 'center',
          gridArea: 'a',
          '@bp3': { gridArea: 'c' },
        }}
      >
        {weatherUI}
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
