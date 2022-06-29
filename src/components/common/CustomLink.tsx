import { styled } from '@/stitches.config';
import NextLink from 'next/link';
import * as React from 'react';
import { buttonReset } from './Button';
import { link } from './Text';

interface CustomLinkProps extends React.HtmlHTMLAttributes<HTMLAnchorElement> {
  href: string;
}
export type CustomLinkRef = HTMLAnchorElement;

export const CustomLink = React.forwardRef<CustomLinkRef, CustomLinkProps>(
  (props, forwardedRef) => {
    const { href, children, ...rest } = props;
    return (
      <NextLink href={href} passHref>
        <a {...rest} ref={forwardedRef}>
          {children}
        </a>
      </NextLink>
    );
  },
);

export const StyledLink = styled(CustomLink, link);

export const ButtonLink = styled(CustomLink, buttonReset, {
  display: 'inline-flex',
  lineHeight: '$tight',
  justifyContent: 'center',
  borderRadius: 5,
  alignItems: 'center',
  border: '1px solid $surface2',
  fontSize: '$1',
  minWidth: 90,
  px: '$s',
  minHeight: 40,
  transition: 'background opacity $default',
  backgroundColor: '$surface1',
  hover: {
    backgroundColor: '$slate4',
  },
  '* + *': {
    marginLeft: '$2xs',
  },
});

CustomLink.displayName = 'CustomLink';
