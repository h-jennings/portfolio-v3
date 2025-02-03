'use client';
import { flex } from 'ds/patterns';
import dynamic from 'next/dynamic';

export const TimeWithLoading = dynamic(() => import('./time'), {
  ssr: false,
  loading: () => (
    <span
      className={flex({
        textStyle: 'base',
        fontSize: '1',
        lineHeight: 'tight',
        color: 'slate7',
      })}
    >
      00:00 XX
    </span>
  ),
});
