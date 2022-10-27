import { styled } from '@/stitches.config';
import { useRouter } from 'next/router';
import { CustomLink } from './CustomLink';

export const PreviewModeControls = () => {
  const { isPreview } = useRouter();

  if (!isPreview) return null;

  return (
    <Wrapper>
      <CustomLink href='/api/preview/exit'>Exit Preview</CustomLink>
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  position: 'fixed',
  bottom: '$m',
  left: '$m',
  zIndex: '$nuclear',
});
