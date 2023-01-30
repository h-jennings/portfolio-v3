import { blockquote } from '@/styles/elements/blockquote.css';
import { link } from '@/styles/elements/link.css';
import { bodyText, text } from '@/styles/primitives/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import {
  NodeRendererType,
  RichText as GRichText,
} from '@graphcms/rich-text-react-renderer';
import { EmbedReferences, RichTextContent } from '@graphcms/rich-text-types';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import clsx from 'clsx';
import Link from 'next/link';
import { HygraphImageWithLoader } from '../HygraphImageWithLoader';
import { ImageContainer } from '../ImageContainer';
import { ImageProps } from '../Media';
import * as s from './RichText.css';

interface RichTextProps {
  content: RichTextContent;
  renderers?: NodeRendererType;
  references?: EmbedReferences;
}

export const RichText = ({ content, renderers, references }: RichTextProps) => {
  const combinedRenderers = { ...DEFAULT_RENDERERS, ...renderers };
  return (
    <GRichText
      references={references}
      content={content}
      renderers={combinedRenderers}
    />
  );
};

const DEFAULT_RENDERERS: NodeRendererType = {
  h1: ({ children }) => (
    <h3
      className={clsx(
        text({ leading: 'body', size: '4', color: '1' }),
        sprinkles({ marginBottom: 'l' }),
      )}
    >
      {children}
    </h3>
  ),
  h2: ({ children }) => (
    <h3
      className={clsx(
        text({ leading: 'body', size: '3', color: '1' }),
        sprinkles({ marginBottom: 'xs' }),
      )}
    >
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h3
      className={clsx(
        text({ leading: 'body', size: '3', color: '1' }),
        sprinkles({ marginBottom: 'xs' }),
      )}
    >
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4
      className={clsx(
        text({ leading: 'body', size: '2', color: '2' }),
        sprinkles({ marginBottom: 'm' }),
      )}
    >
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5
      className={clsx(
        text({ leading: 'body', size: '2', color: '1' }),
        sprinkles({ marginBottom: 'm' }),
      )}
    >
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6
      className={clsx(
        text({ leading: 'body', size: '2', color: '1' }),
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
  a: ({ children, href, rel, openInNewTab, ...rest }) => (
    <Link
      {...rest}
      rel={openInNewTab ? 'noopener norefferer' : rel}
      className={link({ color: '3' })}
      style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
      href={href ?? ''}
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => <ul className={s.unorderedList}>{children}</ul>,
  ol: ({ children }) => <ol className={s.orderedList}>{children}</ol>,
  li: ({ children }) => (
    <li className={clsx(text({ leading: 'body' }), s.listItem)}>{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className={blockquote}>{children}</blockquote>
  ),
  Asset: {
    image: ({
      height,
      width,
      url,
      caption,
    }: ImageProps & { caption?: string }) => (
      <ImageContainer caption={caption}>
        <AspectRatio.Root ratio={width / height}>
          <HygraphImageWithLoader
            src={url}
            alt=''
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            sizes='100vw, 700px'
          />
        </AspectRatio.Root>
      </ImageContainer>
    ),
  },
};
