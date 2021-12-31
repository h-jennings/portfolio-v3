import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import NextImage, { ImageProps } from 'next/image';

interface RatioImageProps extends ImageProps {
  ratio?: number;
}

export const RatioImage = ({ ratio = 1, ...imageProps }: RatioImageProps) => {
  return (
    <AspectRatio.Root ratio={ratio}>
      <NextImage {...imageProps} layout='fill' />
    </AspectRatio.Root>
  );
};
