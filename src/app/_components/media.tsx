import { HygraphImageWithLoader } from '@/app/_components/hygraph-image-with-loader';
import { AspectRatioRoot } from './aspect-ratio';

interface MediaProps {
  width: number;
  height: number;
  url: string;
  sizes?: string;
}

export type ImageProps = {
  type: 'IMAGE';
} & MediaProps;

type VideoProps = {
  type: 'VIDEO';
} & MediaProps;

export const Media = (props: ImageProps | VideoProps) => {
  const Component = (() => {
    switch (props.type) {
      case 'IMAGE':
        return <ImageMedia {...props} />;
      case 'VIDEO':
        return <VideoMedia {...props} />;
      default:
        return null;
    }
  })();

  return Component;
};

const ImageMedia = (props: ImageProps) => {
  const { url, width, height, sizes } = props;
  return (
    <AspectRatioRoot ratio={width / height}>
      <HygraphImageWithLoader
        src={url}
        alt=''
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
        sizes={sizes}
      />
    </AspectRatioRoot>
  );
};

const VideoMedia = (props: VideoProps) => {
  const { url, width, height } = props;
  return (
    <AspectRatioRoot ratio={width / height}>
      <video
        src={url}
        style={{
          objectFit: 'cover',
          height: '100%',
        }}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      />
    </AspectRatioRoot>
  );
};
