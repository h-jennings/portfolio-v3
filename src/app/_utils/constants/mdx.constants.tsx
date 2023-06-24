import { Separator } from '@/app/_components/separator';
import { blockquote } from '@/app/_styles/blockquote';
import {
  inlineElementReset,
  listItem,
  orderedList,
  unorderedList,
} from '@/app/_styles/rich-text';
import { css, cx } from 'ds/css';
import { link } from 'ds/recipes';
import Link from 'next/link';

export const MDX_ELEMENTS = {
  h1: (props: any) => (
    <h1
      className={css({
        textStyle: 'base',
        lineHeight: 'body',
        fontSize: '4',
        color: '1',
        mb: 'l',
      })}
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className={css({
        textStyle: 'base',
        lineHeight: 'body',
        fontSize: '3',
        color: '1',
        mt: 'l',
        mb: 'm',
      })}
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className={css({
        textStyle: 'base',
        lineHeight: 'body',
        fontSize: '2',
        color: '1',
        mb: 'm',
      })}
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className={css({
        textStyle: 'base',
        lineHeight: 'body',
        fontSize: '1',
        color: 'text1',
        mb: 'm',
      })}
      {...props}
    />
  ),
  h5: (props: any) => (
    <h5
      className={css({
        textStyle: 'base',
        lineHeight: 'body',
        fontSize: '2',
        color: 'text1',
        mb: 'm',
      })}
      {...props}
    />
  ),
  h6: (props: any) => (
    <h6
      className={css({
        textStyle: 'base',
        lineHeight: 'body',
        fontSize: '2',
        color: 'text1',
        mb: 'm',
      })}
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className={css({
        textStyle: 'body',
        mb: 'm',
      })}
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong
      className={cx(css({ fontWeight: 'bold' }), inlineElementReset)}
      {...props}
    />
  ),
  em: (props: any) => (
    <em
      className={cx(
        css({ fontFamily: 'serif', fontStyle: 'italic' }),
        inlineElementReset,
      )}
      {...props}
    />
  ),
  a: (props: any) => (
    <Link
      {...props}
      className={cx(
        link({ color: 'accent' }),
        css({ fontSize: 'inherit', lineHeight: 'inherit' }),
      )}
    />
  ),
  ul: (props: any) => <ul className={unorderedList} {...props} />,
  ol: (props: any) => <ol className={orderedList} {...props} />,
  li: (props: any) => (
    <li
      className={cx(css({ textStyle: 'base', lineHeight: 'body' }), listItem)}
      {...props}
    />
  ),
  hr: (props: any) => <Separator {...props} />,
  blockquote: (props: any) => <blockquote className={blockquote} {...props} />,
  pre: (props: any) => (
    <pre
      className={css({
        mb: 'm',
        w: 'full',
        maxW: 'channel',
      })}
      {...props}
    />
  ),
} as const;
