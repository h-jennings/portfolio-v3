import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import * as React from 'react';
import * as s from './LinkBox.css';

export const LinkBoxRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      {...rest}
      className={clsx(s.root, className ?? '')}
      ref={forwardedRef}
    />
  );
});

LinkBoxRoot.displayName = 'LinkBoxRoot';

interface LinkTargetProps extends React.ComponentPropsWithoutRef<'a'> {
  href: string;
  openInNewTab?: boolean;
  target?: string;
  rel?: string;
  as?: LinkProps['as'];
}
export type LinkTargetRef = HTMLAnchorElement;

const LinkBoxTarget = React.forwardRef<
  LinkTargetRef,
  React.PropsWithChildren<LinkTargetProps>
>(({ children, className, ...rest }, forwardedRef) => {
  return (
    <Link
      {...rest}
      className={clsx('linkbox__target', s.target, className)}
      ref={forwardedRef}
    >
      {children}
    </Link>
  );
});

LinkBoxTarget.displayName = 'LinkBoxTarget';

const Root = LinkBoxRoot;
const Target = LinkBoxTarget;

export const LinkBox = {
  Root,
  Target,
};
