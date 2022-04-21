import { styled } from '@/stitches.config';
import { useIsMounted } from '@utils/common/hooks/use-is-mounted';
import { LayoutGroup, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { buttonReset } from './Button';
import { Grid } from './Grid';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';
import { SystemIcon } from './icons/SystemIcon';

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

  const Icon = ICON_SVG_COMPONENTS[icon].icon ?? (() => null);
  const buttonLabel = ICON_SVG_COMPONENTS[icon].label;

  return (
    <Grid center css={{ position: 'relative', height: 20, zIndex: 0 }}>
      <StyledIconButton
        isActive={isActive}
        aria-label={`Change to ${buttonLabel}`}
        onClick={() => setTheme(icon)}
      >
        <Icon />
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

const ICON_SVG_COMPONENTS: Record<
  Theme,
  { label: string; icon: () => JSX.Element }
> = {
  dark: {
    label: 'dark theme',
    icon: () => <MoonIcon />,
  },
  system: {
    label: 'system theme',
    icon: () => <SystemIcon />,
  },
  light: {
    label: 'light theme',
    icon: () => <SunIcon />,
  },
};
