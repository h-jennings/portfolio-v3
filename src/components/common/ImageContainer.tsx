import * as React from 'react';
import { Box } from './Box';
import { Stack } from './Stack';
import { Text } from './Text';

interface ImageContainerProps {
  caption: string;
}
export const ImageContainer = ({
  caption,
  children,
}: React.PropsWithChildren<ImageContainerProps>) => {
  return (
    <Stack gap='xs' css={{ pt: '$xs', pb: '$xs' }}>
      <Box
        css={{
          borderRadius: '$card',
          overflow: 'hidden',
          backgroundColor: '$slate8',
        }}
      >
        {children}
      </Box>
      {caption ? (
        <Text size='1' color='2' as='p' css={{ pb: '$m' }}>
          {caption}
        </Text>
      ) : null}
    </Stack>
  );
};
