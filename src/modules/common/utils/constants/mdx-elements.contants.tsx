import { BlockQuote } from '@common/components/BlockQuote';
import { CustomLink } from '@common/components/CustomLink';
import { UnorderedList } from '@common/components/List';
import { Separator } from '@common/components/Separator';
import {
  BodyText,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  ListItem,
  Text,
} from '@common/components/Text';
import * as React from 'react';

export const MDX_ELEMENTS: Record<string, React.ReactNode> = {
  h1: (props: any) => (
    <H1 size='4' leading='body' color='1' css={{ mb: '$s' }} {...props} />
  ),
  h2: (props: any) => (
    <H2 size='3' leading='body' color='1' css={{ mb: '$xs' }} {...props} />
  ),
  h3: (props: any) => (
    <H3 size='2' leading='body' color='2' css={{ mb: '$xs' }} {...props} />
  ),
  h4: (props: any) => (
    <H4 size='1' leading='body' color='1' css={{ mb: '$xs' }} {...props} />
  ),
  h5: (props: any) => (
    <H5 size='2' leading='body' color='1' css={{ mb: '$xs' }} {...props} />
  ),
  h6: (props: any) => (
    <H6 size='2' leading='body' color='1' css={{ mb: '$xs' }} {...props} />
  ),
  p: (props: any) => <BodyText css={{ mb: '$xs' }} {...props} />,
  strong: (props: any) => (
    <Text
      as='strong'
      weight='bold'
      css={{ fontSize: 'inherit', color: 'inherit', lineHeight: 'inherit' }}
      {...props}
    />
  ),
  em: (props: any) => (
    <Text
      as='em'
      family='serif'
      css={{ fontSize: 'inherit', color: 'inherit', lineHeight: 'inherit' }}
      {...props}
    />
  ),
  a: (props: any) => (
    <CustomLink
      css={{
        color: '3',
        css: {
          fontSize: 'inherit',
          lineHeight: 'inherit',
        },
      }}
      {...props}
    />
  ),
  ul: (props: any) => <UnorderedList css={{ mb: '$xs' }} {...props} />,
  ol: (props: any) => (
    <UnorderedList
      as='ol'
      css={{
        mb: '$xs',
        listStyle: 'none',
        counterReset: 'listCounter',
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
      {...props}
    />
  ),
  li: (props: any) => (
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
      {...props}
    />
  ),
  hr: (props: any) => <Separator {...props} />,
  blockquote: (props: any) => <BlockQuote {...props} />,
};
