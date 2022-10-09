import {
  NodeRendererType,
  RichText as GRichText,
} from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';
import { BlockQuote } from './BlockQuote';
import { StyledLink } from './CustomLink';
import { UnorderedList } from './List';
import { BodyText, H3, H4, H5, H6, ListItem, Text } from './Text';

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
    <H3 leading='body' size='4' color='1' css={{ mb: '$l' }}>
      {children}
    </H3>
  ),
  h2: ({ children }) => (
    <H3 leading='body' color='1' size='3' css={{ marginBottom: '$xs' }}>
      {children}
    </H3>
  ),
  h3: ({ children }) => (
    <H3 leading='body' size='3' color='1' css={{ marginBottom: '$xs' }}>
      {children}
    </H3>
  ),
  h4: ({ children }) => (
    <H4 leading='body' size='2' color='2' css={{ marginBottom: '$m' }}>
      {children}
    </H4>
  ),
  h5: ({ children }) => (
    <H5 leading='body' size='2' color='1' css={{ marginBottom: '$m' }}>
      {children}
    </H5>
  ),
  h6: ({ children }) => (
    <H6 leading='body' size='2' color='1' css={{ marginBottom: '$m' }}>
      {children}
    </H6>
  ),
  p: ({ children }) => (
    <BodyText
      css={{
        marginBottom: '$m',
        '&:last-of-type': { marginBottom: 0 },
      }}
    >
      {children}
    </BodyText>
  ),
  bold: ({ children }) => (
    <Text
      as='strong'
      weight='bold'
      css={{
        display: 'inline',
        fontSize: 'inherit',
        color: 'inherit',
        lineHeight: 'inherit',
      }}
    >
      {children}
    </Text>
  ),
  italic: ({ children }) => (
    <Text
      as='i'
      family='serif'
      css={{
        display: 'inline',
        color: 'inherit',
        fontSize: 'inherit',
        fontStyle: 'italic',
      }}
    >
      {children}
    </Text>
  ),
  a: ({ children, href, ...rest }) => (
    <StyledLink
      href={href ?? ''}
      color='3'
      css={{ fontSize: 'inherit', lineHeight: 'inherit' }}
      {...rest}
    >
      {children}
    </StyledLink>
  ),
  ul: ({ children }) => (
    <UnorderedList
      css={{
        mb: '$m',
        [`${UnorderedList}`]: {
          mb: '$2xs',
        },
      }}
    >
      {children}
    </UnorderedList>
  ),
  ol: ({ children }) => (
    <UnorderedList
      as='ol'
      css={{
        mb: '$m',
        listStyle: 'none',
        counterReset: 'listCounter',
        [`${UnorderedList}`]: {
          mb: '$xs',
        },
        [`& > ${ListItem}`]: {
          '&:before': {
            counterIncrement: 'listCounter',
            display: 'inline-block',
            content: 'counter(listCounter)"."',
            width: '1em',
            ml: '-1em',
          },
        },
      }}
    >
      {children}
    </UnorderedList>
  ),
  li: ({ children }) => (
    <ListItem
      leading='body'
      css={{
        listStyle: 'none',
        ml: 0,
        pl: 0,
        '&:before': {
          display: 'inline-block',
          content: '-',
          width: '1em',
          ml: '-1em',
        },
        'ul,ol': {
          li: {
            '&:first-of-type': {
              pt: '$xs',
            },
          },
        },
        mb: '$xs',
      }}
    >
      {children}
    </ListItem>
  ),
  blockquote: ({ children }) => <BlockQuote>{children}</BlockQuote>,
};
