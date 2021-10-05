import { css } from '@/stitches.config';
// import { motion } from 'framer-motion';
import React from 'react';

const container = css({
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

const circle = css({
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
    <div className={container({ status })}>
      <div className={circle({ status })} />
      <div style={{ userSelect: 'none' }}>{copy[status]}</div>
    </div>
  );
}
