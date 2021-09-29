import { useCurrentTimeInDC } from '@/components/Footer/current-time';
import { PATHS } from '@/constants/paths';
import { WeatherData } from '@/machines/weather-data-machine';
import { styled } from '@/stitches.config';
import isUndefined from 'lodash/fp/isUndefined';
import Image from 'next/image';
import React from 'react';
import { Box } from '../primitives/Box';
import { Flex } from '../primitives/Flex';
import { Stack } from '../primitives/Stack';
import { StyledLink } from '../primitives/StyledLink';
import { Text } from '../primitives/Text';
import { useWeatherInfo } from './weather-info';

const FooterText = styled(Text, {
  fontSize: '$1',
});
const FooterLink = styled(StyledLink, { fontSize: '$1' });
const Container = styled(Flex, {
  jc: 'space-between',
  pb: '$6',
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

function tempText(temp: number | undefined): string {
  return isUndefined(temp) ? 'XX' : Math.round(temp).toString();
}

export function Footer(): JSX.Element {
  const currentTime = useCurrentTimeInDC();

  const current = useWeatherInfo();

  const weatherUI = React.useMemo(() => {
    const { data } = current.context;
    switch (true) {
      case current.matches('idle.noError.noData'): {
        return null;
      }
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
        return <div>default case</div>;
      }
    }
  }, [current]);

  return (
    <Container as='footer'>
      <Stack direction='row' gap='6'>
        <Stack gap='1'>
          <FooterText>design and development</FooterText>
          <FooterText>&copy; Hunter Jennings 2021</FooterText>
        </Stack>
        <Stack gap='1'>
          <FooterText as='time'>{currentTime}</FooterText>
          <FooterText>Washington D.C.</FooterText>
        </Stack>
        <Flex css={{ flexDirection: 'row', alignItems: 'center' }}>
          {weatherUI}
        </Flex>
      </Stack>
      <Stack direction='row' gap='2' as='ul'>
        <li>
          <FooterLink href={PATHS.github}>Gh</FooterLink>
        </li>
        <li>
          <FooterLink href={PATHS.linkedin}>Li</FooterLink>
        </li>
        <li>
          <FooterLink href={PATHS.twitter}>Tw</FooterLink>
        </li>
      </Stack>
    </Container>
  );
}
