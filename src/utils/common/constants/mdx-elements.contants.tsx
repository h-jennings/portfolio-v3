import * as s from '@/components/common/RichText/RichText.css';
import { blockquote } from '@/styles/elements/blockquote.css';
import { link } from '@/styles/elements/link.css';
import { bodyText, text } from '@/styles/elements/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { CustomLink } from '@components/common/CustomLink';
import { Separator } from '@components/common/Separator/Separator';
import clsx from 'clsx';
import { MDXRemoteProps } from 'next-mdx-remote';

export const MDX_ELEMENTS = {
  h1: (props: any) => (
    <h1
      className={clsx(
        text({ leading: 'body', size: 4, color: 1 }),
        sprinkles({ marginBottom: 'l' }),
      )}
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className={clsx(
        text({ leading: 'body', size: 3, color: 1 }),
        sprinkles({ marginTop: 'l', marginBottom: 'xs' }),
      )}
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className={clsx(
        text({ leading: 'body', size: 2, color: 1 }),
        sprinkles({ marginBottom: 'm' }),
      )}
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className={clsx(
        text({ leading: 'body', size: 1, color: 1 }),
        sprinkles({ marginBottom: 'm' }),
      )}
      {...props}
    />
  ),
  h5: (props: any) => (
    <h5
      className={clsx(
        text({ leading: 'body', size: 2, color: 1 }),
        sprinkles({ marginBottom: 'm' }),
      )}
      {...props}
    />
  ),
  h6: (props: any) => (
    <h6
      className={clsx(
        text({ leading: 'body', size: 2, color: 1 }),
        sprinkles({ marginBottom: 'm' }),
      )}
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className={clsx(bodyText, sprinkles({ marginBottom: 'm' }), s.paragraph)}
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong
      className={clsx(text({ weight: 'bold' }), s.inlineElementReset)}
      {...props}
    />
  ),
  em: (props: any) => (
    <em
      className={clsx(text({ family: 'serif' }), s.inlineElementReset)}
      {...props}
    />
  ),
  a: (props: any) => (
    <CustomLink
      className={link({ color: 3 })}
      style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
      {...props}
    />
  ),
  ul: (props: any) => <ul className={s.unorderedList} {...props} />,
  ol: (props: any) => <ol className={s.orderedList} {...props} />,
  li: (props: any) => (
    <li className={clsx(text({ leading: 'body' }), s.listItem)} {...props} />
  ),
  hr: (props: any) => <Separator {...props} />,
  blockquote: (props: any) => <blockquote className={blockquote} {...props} />,
} as MDXRemoteProps['components'];
