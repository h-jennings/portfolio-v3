import type { NextPage } from 'next';
import { Text } from '@components/primitives/Text';
import { RootLayout } from '@/components/RootLayout';

const Index: NextPage = () => {
  return (
    <RootLayout>
      <Text css={{ fontSize: '$3' }}>Welcome Next.js!</Text>
    </RootLayout>
  );
};

export default Index;
