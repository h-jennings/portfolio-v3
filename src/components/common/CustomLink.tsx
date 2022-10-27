import NextLink, { type LinkProps } from 'next/link';
import * as React from 'react';

interface CustomLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  href: string;
  as?: LinkProps['as'];
}
export type CustomLinkRef = HTMLAnchorElement;

export const CustomLink = React.forwardRef<CustomLinkRef, CustomLinkProps>(
  (props, forwardedRef) => {
    const { href, children, as, ...rest } = props;
    return (
      <NextLink href={href} as={as} passHref>
        <a {...rest} ref={forwardedRef}>
          {children}
        </a>
      </NextLink>
    );
  },
);

CustomLink.displayName = 'CustomLink';
