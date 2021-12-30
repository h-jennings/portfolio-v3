import { styled } from '@/stitches.config';
import * as React from 'react';

const Container = styled('div', {
  border: '1px solid',
  overflow: 'hidden',
  px: '$1',
  py: '5px',
  fontSize: '12px',
  borderRadius: '$pill',
  d: 'grid',
  gridTemplateColumns: 'repeat(2, auto)',
  gap: '$1',
  ai: 'center',
  '@bp2': {
    fontSize: '$1',
  },
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
  width: '6px',
  height: '6px',
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

type Status = 'available' | 'inactive';
interface AvailabilityProps {
  status: Status;
}
const copy: Record<AvailabilityProps['status'], string> = {
  available: 'available for work',
  inactive: 'not available for work',
};

export function Availability({ status }: AvailabilityProps): JSX.Element {
  return (
    <Container status={status}>
      <Circle status={status} />
      <div style={{ userSelect: 'none' }}>{copy[status]}</div>
    </Container>
  );
}
