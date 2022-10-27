import { useIsMounted } from '@utils/common/hooks/use-is-mounted';
import { LayoutGroup, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';
import { SystemIcon } from '../icons/SystemIcon';
import * as s from './ThemeToggle.css';

type Theme = 'system' | 'light' | 'dark';

export const ThemeToggle = (): JSX.Element | null => {
  const { theme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <div className={s.toggle.root}>
      <LayoutGroup>
        {Object.keys(ICON_SVG_COMPONENTS).map((key) => (
          <IconButton theme={theme as Theme} key={key} icon={key as Theme} />
        ))}
      </LayoutGroup>
    </div>
  );
};

interface IconButtonProps {
  icon: Theme;
  theme: Theme;
}

const IconButton = ({ icon, theme }: IconButtonProps): JSX.Element => {
  const { setTheme } = useTheme();
  const isActive = theme === icon;

  const Icon = ICON_SVG_COMPONENTS[icon].icon;
  const buttonLabel = ICON_SVG_COMPONENTS[icon].label;

  return (
    <div className={s.button.wrapper}>
      <button
        className={s.button.root({ isActive })}
        aria-label={`Change to ${buttonLabel}`}
        onClick={() => setTheme(icon)}
      >
        <Icon />
      </button>
      {isActive ? (
        <motion.div className={s.button.circle} layout layoutId='circle' />
      ) : null}
    </div>
  );
};

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
