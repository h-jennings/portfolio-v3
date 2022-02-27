import { styled } from '@/stitches.config';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { Stack } from './Stack';

export const Separator = (): JSX.Element => {
  return (
    <SeparatorRoot>
      <Stack css={{ jc: 'center' }} direction='row' gap='3xs'>
        <Dot />
        <Dot />
        <Dot />
      </Stack>
    </SeparatorRoot>
  );
};

const Dot = styled('div', {
  width: 2,
  height: 2,
  borderRadius: '$round',
  backgroundColor: '$slate12',
});

const SeparatorRoot = styled(SeparatorPrimitive.Root, {
  width: '$full',
  pt: '$m',
  pb: '$m',
});
