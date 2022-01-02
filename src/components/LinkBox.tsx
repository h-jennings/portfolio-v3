import { css } from '@/stitches.config';
import * as React from 'react';
import { focus } from './Text';

type LinkBoxProps = React.HtmlHTMLAttributes<HTMLDivElement>;
export type LinkBoxRef = HTMLDivElement;

export const LinkBox = React.forwardRef<LinkBoxRef, LinkBoxProps>(
  (props, forwardedRef) => {
    const { className, ...rest } = props;

    return (
      <div {...rest} className={`linkbox ${linkBox()}`} ref={forwardedRef} />
    );
  },
);

LinkBox.displayName = 'LinkBox';

const linkBox = css({
  position: 'relative',
  'a[href]:not(.linkbox__overlay), abbr[title]': {
    position: 'relative',
    zIndex: '1',
  },
});

interface LinkOverlayProps extends React.HtmlHTMLAttributes<HTMLAnchorElement> {
  isExternal?: boolean;
  target?: string;
  rel?: string;
}
export type LinkOverlayRef = HTMLAnchorElement;

export const LinkOverlay = React.forwardRef<LinkOverlayRef, LinkOverlayProps>(
  (props, forwardedRef) => {
    const { isExternal, target, rel, className, ...rest } = props;
    return (
      <a
        {...rest}
        className={`linkbox__overlay ${linkOverlay()} ${className}`}
        rel={isExternal ? 'noopener norefferer' : rel}
        target={isExternal ? '_blank' : target}
        ref={forwardedRef}
      />
    );
  },
);

LinkOverlay.displayName = 'LinkOverlay';

const linkOverlay = css(focus, {
  position: 'static',
  '&::before': {
    content: "''",
    cursor: 'inherit',
    d: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '$full',
    height: '$full',
  },
});
