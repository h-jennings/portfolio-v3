import { styled } from '@/stitches.config';
import React from 'react';
import { Box } from './primitives/Box';

interface AvailabilityProps {
  status: 'available' | 'inactive';
}

const Container = styled('div', {
  border: '1px solid',
  px: '$1',
  py: '5px',
  fontSize: '$1',
  borderRadius: '$pill',
  d: 'grid',
  gridTemplateColumns: 'repeat(2, auto)',
  gap: '$1',
  ai: 'center',
  variants: {
    status: {
      available: {
        borderColor: '$green10',
        color: '$green10',
      },
      inactive: {
        borderColor: '$yellow11',
        color: '$yellow11',
      },
    },
  },
});

const Circle = styled('div', {
  width: '5px',
  height: '5px',
  borderRadius: '$round',
  variants: {
    status: {
      available: {
        backgroundColor: '$green10',
      },
      inactive: {
        backgroundColor: '$yellow11',
      },
    },
  },
});

const copy: Record<AvailabilityProps['status'], string> = {
  available: 'available for work',
  inactive: 'not available for work',
};
export function Availability({ status }: AvailabilityProps): JSX.Element {
  const text: string = React.useMemo(() => {
    return copy[status];
  }, [status]);
  return (
    <Container status={status}>
      <Circle status={status} />
      <Box css={{ userSelect: 'none' }}>{text}</Box>
    </Container>
  );
}
