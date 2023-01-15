import { ds } from '@/styles/ds.css';
import { stack } from '@/styles/primitives/stack.css';
import { text } from '@/styles/primitives/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import clsx from 'clsx';
import * as React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import { LinkBox } from './LinkBox/LinkBox';

interface BackToLinkProps {
  href: string;
}

export const BackToLink = ({
  children,
  href,
}: React.PropsWithChildren<BackToLinkProps>): JSX.Element => {
  return (
    <LinkBox.Root>
      <div
        className={clsx(
          sprinkles({ marginBottom: 'm' }),
          stack({
            align: 'center',
            orientation: 'horizontal',
            inline: true,
            gap: 'xs',
          }),
        )}
      >
        <ArrowLeftIcon color={ds.theme.colors.text1} width={15} aria-hidden />
        <LinkBox.Target href={href} style={{ display: 'flex' }}>
          <span className={text({ leading: 'tight' })} style={{ fontSize: 12 }}>
            {children}
          </span>
        </LinkBox.Target>
      </div>
    </LinkBox.Root>
  );
};
