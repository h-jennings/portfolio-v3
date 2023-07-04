'use client';

import { ThemeProvider } from 'next-themes';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

interface ProvidersProps {
  children: React.ReactNode;
}
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute='class'
      value={{ dark: 'dark-theme', light: 'light-theme' }}
      defaultTheme='system'
    >
      <BalancerProvider>{children}</BalancerProvider>
    </ThemeProvider>
  );
};
