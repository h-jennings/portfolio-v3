import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';

interface MediaProps {
  url: string;
  width: number;
  height: number;
}

type ImageProps = {
  type: 'image';
} & MediaProps;

type VideoProps = {
  type: 'video';
} & MediaProps;

export const Media = (props: ImageProps | VideoProps) => {
  const Component = (() => {
    switch (props.type) {
      case 'image':
        return <ImageMedia {...props} />;
      case 'video':
        return <VideoMedia {...props} />;
      default:
        return null;
    }
  })();

  return Component;
};

const ImageMedia = (props: ImageProps) => {
  const { url, width, height } = props;
  return (
    <Image
      src={url}
      alt=''
      layout='responsive'
      blurDataURL={url}
      placeholder='blur'
      objectFit='cover'
      width={width}
      height={height}
      quality={95}
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
