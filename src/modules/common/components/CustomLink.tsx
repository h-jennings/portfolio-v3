import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { css } from '@stitches/react';
import NextLink from 'next/link';
import * as React from 'react';
import { Grid } from './Grid';
import { link } from './Text';

interface CustomLinkProps extends React.HtmlHTMLAttributes<HTMLAnchorElement> {
  href: string;
  css?: Parameters<typeof link>[0];
}
export type CustomLinkRef = HTMLAnchorElement;

export const CustomLink = React.forwardRef<CustomLinkRef, CustomLinkProps>(
  (props, forwardedRef) => {
    const { href, css, children, ...rest } = props;
    return (
      <NextLink href={href} passHref>
        {isExternalLink(href) ? (
          <a
            {...rest}
            className={externalLink(css)}
            rel='noopener norefferer'
            ref={forwardedRef}
          >
            {children}
            <Grid as='span' css={{ height: 15, width: 15 }} center>
              <ArrowTopRightIcon
                width={15}
                height={15}
                color={`var(--colors-text${css?.color})`}
              />
            </Grid>
          </a>
        ) : (
          <a
            {...rest}
            style={{ display: 'inline-grid' }}
            className={link(css)}
            ref={forwardedRef}
          >
            {children}
          </a>
        )}
      </NextLink>
    );
  },
);

CustomLink.displayName = 'CustomLink';

const externalLink = css(link, {
  display: 'inline-grid',
  alignItems: 'center',
  gridTemplateColumns: 'auto min-content',
  lineHeight: '$tight',
});

function isExternalLink(href: string): boolean {
  const externalLinkRegex = /^https?:\/\//;
  const mailToRegex = /^mailto\:/;
  return externalLinkRegex.test(href) || mailToRegex.test(href);
}
