import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { HygraphImageWithLoader } from './HygraphImageWithLoader';

interface MediaProps {
  url: string;
  width: number;
  height: number;
  sizes?: string;
}

type ImageProps = {
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
    <HygraphImageWithLoader
      src={url}
      alt=''
      layout='responsive'
      blurDataURL={url}
      placeholder='blur'
      objectFit='cover'
      width={width}
      height={height}
      quality={100}
      sizes={sizes}
    />
  );
};

const VideoMedia = (props: VideoProps) => {
  const { url, width, height } = props;
  return (
    <AspectRatio.Root ratio={width / height}>
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
    </AspectRatio.Root>
  );
};
