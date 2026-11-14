import { MoonIcon } from '@/app/_components/icons/MoonIcon';
import { SunIcon } from '@/app/_components/icons/SunIcon';
import { SystemIcon } from '@/app/_components/icons/SystemIcon';

export type Theme = 'system' | 'light' | 'dark';

export const ICON_SVG_COMPONENTS = {
  dark: {
    label: 'Dark',
    icon: MoonIcon,
  },
  system: {
    label: 'System',
    icon: SystemIcon,
  },
  light: {
    label: 'Light',
    icon: SunIcon,
  },
};
