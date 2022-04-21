import { IconProps } from '@utils/common/types/icon-props';
import * as React from 'react';

export const SystemIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <>
        <svg
          width='15'
          height='15'
          viewBox='0 0 15 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          {...props}
          ref={forwardedRef}
        >
          <title>System Theme Icon</title>
          <path
            d='M7.5.877a6.623 6.623 0 1 0 0 13.246A6.623 6.623 0 0 0 7.5.877Zm0 .95a5.673 5.673 0 0 0 0 11.346V1.827Z'
            fill={color}
            fillRule='evenodd'
            clipRule='evenodd'
          />
        </svg>
      </>
    );
  },
);

SystemIcon.displayName = 'SystemIcon';
