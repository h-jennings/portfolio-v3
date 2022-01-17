import { WithChildren } from '@common/utils/types/with-children';
import { Box } from './Box';
import { Stack } from './Stack';
import { Text } from './Text';

interface ImageContainerProps {
  caption: string;
}
export const ImageContainer = ({
  caption,
  children,
}: ImageContainerProps & WithChildren) => {
  return (
    <Stack gap='xs' css={{ pt: '$xs', pb: '$xs' }}>
      <Box
        css={{
          borderRadius: '15px',
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
