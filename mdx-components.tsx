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
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: React.ComponentPropsWithoutRef<'h1'>) => (
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
    h2: (props: React.ComponentPropsWithoutRef<'h2'>) => (
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
    h3: (props: React.ComponentPropsWithoutRef<'h3'>) => (
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
    h4: (props: React.ComponentPropsWithoutRef<'h4'>) => (
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
    h5: (props: React.ComponentPropsWithoutRef<'h5'>) => (
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
    h6: (props: React.ComponentPropsWithoutRef<'h6'>) => (
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
    p: (props: React.ComponentPropsWithoutRef<'p'>) => (
      <p
        className={css({
          textStyle: 'body',
          mb: 'm',
        })}
        {...props}
      />
    ),
    strong: (props: React.ComponentPropsWithoutRef<'strong'>) => (
      <strong
        className={cx(css({ fontWeight: 'bold' }), inlineElementReset)}
        {...props}
      />
    ),
    em: (props: React.ComponentPropsWithoutRef<'em'>) => (
      <em
        className={cx(
          css({ fontFamily: 'serif', fontStyle: 'italic' }),
          inlineElementReset,
        )}
        {...props}
      />
    ),
    a: (props: React.ComponentPropsWithoutRef<'a'>) => (
      <Link
        {...props}
        href={props.href ?? '#'}
        className={cx(
          link({ color: 'accent' }),
          css({ fontSize: 'inherit', lineHeight: 'inherit' }),
        )}
      />
    ),
    ul: (props: React.ComponentPropsWithoutRef<'ul'>) => (
      <ul className={unorderedList} {...props} />
    ),
    ol: (props: React.ComponentPropsWithoutRef<'ol'>) => (
      <ol className={orderedList} {...props} />
    ),
    li: (props: React.ComponentPropsWithoutRef<'li'>) => (
      <li
        className={cx(css({ textStyle: 'base', lineHeight: 'body' }), listItem)}
        {...props}
      />
    ),
    hr: (props: React.ComponentPropsWithoutRef<'hr'>) => (
      <Separator {...props} />
    ),
    blockquote: (props: React.ComponentPropsWithoutRef<'blockquote'>) => (
      <blockquote className={blockquote} {...props} />
    ),
    pre: (props: React.ComponentPropsWithoutRef<'pre'>) => (
      <pre
        className={css({
          mb: 'm',
          w: 'full',
          maxW: 'channel',
        })}
        {...props}
      />
    ),
    ...components,
  };
}
