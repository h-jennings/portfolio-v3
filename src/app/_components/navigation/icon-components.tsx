import { MoonIcon } from '@/app/_components/icons/MoonIcon';
import { SunIcon } from '@/app/_components/icons/SunIcon';
import { SystemIcon } from '@/app/_components/icons/SystemIcon';

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
