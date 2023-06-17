import { basierCircle, untitledSerif, jetbrainsMono } from './_styles/fonts';

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='en'
      className={`${basierCircle.variable} ${untitledSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
