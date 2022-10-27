import { blockquote } from '@/styles/elements/blockquote.css';
import { link } from '@/styles/elements/link.css';
import { bodyText, text } from '@/styles/elements/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import {
  NodeRendererType,
  RichText as GRichText,
} from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';
import clsx from 'clsx';
import { CustomLink } from '../CustomLink';
import * as s from './RichText.css';

interface RichTextProps {
  content: RichTextContent;
  renderers?: NodeRendererType;
}

export const RichText = ({ content, renderers }: RichTextProps) => {
  const combinedRenderers = { ...DEFAULT_RENDERERS, ...renderers };
  return <GRichText content={content} renderers={combinedRenderers} />;
};

const DEFAULT_RENDERERS: NodeRendererType = {
  h1: ({ children }) => (
    <h3
      className={clsx(
        text({ leading: 'body', size: 4, color: 1 }),
        sprinkles({ marginBottom: 'l' }),
      )}
    >
      {children}
    </h3>
  ),
  h2: ({ children }) => (
    <h3
      className={clsx(
        text({ leading: 'body', size: 3, color: 1 }),
        sprinkles({ marginBottom: 'xs' }),
      )}
    >
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h3
      className={clsx(
        text({ leading: 'body', size: 3, color: 1 }),
        sprinkles({ marginBottom: 'xs' }),
      )}
    >
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4
      className={clsx(
        text({ leading: 'body', size: 2, color: 2 }),
        sprinkles({ marginBottom: 'm' }),
      )}
    >
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5
      className={clsx(
        text({ leading: 'body', size: 2, color: 1 }),
        sprinkles({ marginBottom: 'm' }),
      )}
    >
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6
      className={clsx(
        text({ leading: 'body', size: 2, color: 1 }),
        sprinkles({ marginBottom: 'm' }),
      )}
    >
      {children}
    </h6>
  ),
  p: ({ children }) => (
    <p
      className={clsx(
        bodyText,
        sprinkles({
          marginBottom: 'm',
        }),
        s.paragraph,
      )}
    >
      {children}
    </p>
  ),
  bold: ({ children }) => (
    <strong className={clsx(text({ weight: 'bold' }), s.inlineElementReset)}>
      {children}
    </strong>
  ),
  italic: ({ children }) => (
    <i className={clsx(text({ family: 'serif' }), s.inlineElementReset)}>
      {children}
    </i>
  ),
  a: ({ children, href, ...rest }) => (
    <CustomLink
      className={link({ color: 3 })}
      style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
      href={href ?? ''}
      {...rest}
    >
      {children}
    </CustomLink>
  ),
  ul: ({ children }) => <ul className={s.unorderedList}>{children}</ul>,
  ol: ({ children }) => <ol className={s.orderedList}>{children}</ol>,
  li: ({ children }) => (
    <li className={clsx(text({ leading: 'body' }), s.listItem)}>{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className={blockquote}>{children}</blockquote>
  ),
};
