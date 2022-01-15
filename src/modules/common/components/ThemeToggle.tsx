import { styled } from '@/stitches.config';
import { ReactComponent as MoonIcon } from '@assets/common/moon-icon.svg';
import { ReactComponent as SunIcon } from '@assets/common/sun-icon.svg';
import { ReactComponent as SystemIcon } from '@assets/common/system-icon.svg';
import { useIsMounted } from '@common/hooks/use-is-mounted';
import { LayoutGroup, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { buttonReset } from './Button';
import { Grid } from './Grid';

type Theme = 'system' | 'light' | 'dark';

export const ThemeToggle = (): JSX.Element | null => {
  const { theme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <ToggleContainer
      justify='center'
      align='center'
      css={{ gtc: 'repeat(3, 20px)' }}
    >
      <LayoutGroup>
        {Object.keys(ICON_SVG_COMPONENTS).map((key) => (
          <IconButton theme={theme as Theme} key={key} icon={key as Theme} />
        ))}
      </LayoutGroup>
    </ToggleContainer>
  );
};

const ToggleContainer = styled(Grid, {
  backgroundColor: '$slate3',
  height: 30,
  width: 90,
  borderRadius: '$pill',
  gap: '5px',
});

interface IconButtonProps {
  icon: Theme;
  theme: Theme;
}

const IconButton = ({ icon, theme }: IconButtonProps): JSX.Element => {
  const { setTheme } = useTheme();
  const isActive = theme === icon;

  return (
    <Grid center css={{ position: 'relative', height: 20, zIndex: 0 }}>
      <StyledIconButton isActive={isActive} onClick={() => setTheme(icon)}>
        {ICON_SVG_COMPONENTS[icon]}
      </StyledIconButton>
      {isActive ? <Circle layout layoutId='circle' /> : null}
    </Grid>
  );
};

const StyledIconButton = styled('button', buttonReset, {
  width: 15,
  height: 15,
  borderRadius: '$pill',
  zIndex: 2,
  d: 'block',
  color: 'transparent',
  gridArea: ' 1 / 1 / 1 / 1',
  transitionProperty: 'color',
  transition: '$default',
  variants: {
    isActive: {
      true: {
        color: '$slate12',
      },
      false: {
        color: '$slate8',
      },
    },
  },
});

const Circle = styled(motion.div, {
  width: 20,
  height: 20,
  zIndex: 1,
  backgroundColor: '$slate5',
  borderRadius: '$round',
  position: 'absolute',
});

const ICON_SVG_COMPONENTS: Record<Theme, JSX.Element> = {
  dark: <MoonIcon aria-label='dark theme icon' />,
  system: <SystemIcon aria-label='system theme icon' />,
  light: <SunIcon aria-label='light theme icon' />,
};
