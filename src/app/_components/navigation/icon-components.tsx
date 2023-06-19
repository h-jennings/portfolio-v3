import { MoonIcon } from '@components/common/icons/MoonIcon';
import { SunIcon } from '@components/common/icons/SunIcon';
import { SystemIcon } from '@components/common/icons/SystemIcon';

export type Theme = 'system' | 'light' | 'dark';

export const ICON_SVG_COMPONENTS: Record<
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
