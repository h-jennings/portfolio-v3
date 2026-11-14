'use client';

import { colorScheme } from '@/app/_theme/color-scheme';
import { Preferences } from '@ui-sdk/react/preferences';

interface ProvidersProps {
  children: React.ReactNode;
}
export const Providers = ({ children }: ProvidersProps) => {
  return <Preferences preferences={[colorScheme]}>{children}</Preferences>;
};
