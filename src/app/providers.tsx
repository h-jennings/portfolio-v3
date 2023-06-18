'use client';

import { ThemeProvider } from 'next-themes';

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
      {children}
    </ThemeProvider>
  );
};
