import { styled } from '@/stitches.config';
import React from 'react';

type LinkBoxProps = React.HtmlHTMLAttributes<HTMLDivElement>;
export type LinkBoxRef = HTMLDivElement;

const StyledLinkBox = styled('div', {
  position: 'relative',
  'a[href]:not(.linkbox__overlay), abbr[title]': {
    position: 'relative',
    zIndex: '1',
  },
});

export const LinkBox = React.forwardRef<LinkBoxRef, LinkBoxProps>(
  (props, forwardedRef) => {
    const { className, ...rest } = props;

    return <StyledLinkBox {...rest} className='linkbox' ref={forwardedRef} />;
  },
);

LinkBox.displayName = 'LinkBox';

interface LinkOverlayProps extends React.HtmlHTMLAttributes<HTMLAnchorElement> {
  isExternal?: boolean;
  target?: string;
  rel?: string;
}
export type LinkOverlayRef = HTMLAnchorElement;

const StyledLinkOverlay = styled('a', {
  position: 'static',
  '&::before': {
    content: "''",
    cursor: 'inherit',
    d: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    width: '$full',
    height: '$full',
  },
});

export const LinkOverlay = React.forwardRef<LinkOverlayRef, LinkOverlayProps>(
  (props, forwardedRef) => {
    const { isExternal, target, rel, className, ...rest } = props;
    return (
      <StyledLinkOverlay
        {...rest}
        className='linkbox__overlay'
        rel={isExternal ? 'noopener norefferer' : rel}
        target={isExternal ? '_blank' : target}
        ref={forwardedRef}
      />
    );
  },
);

LinkOverlay.displayName = 'LinkOverlay';
