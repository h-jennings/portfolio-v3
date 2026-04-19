import { type ComponentPreview as PreviewData } from '@/app/_utils/content';
import { css } from 'ds/css';
import Image from 'next/image';

interface ComponentPreviewProps {
  preview?: PreviewData;
  sizes?: string;
}

export function ComponentPreview({ preview, sizes }: ComponentPreviewProps) {
  if (preview?.video != null) {
    return (
      <div className={surface} aria-hidden>
        <video
          className={media}
          src={preview.video}
          autoPlay
          loop
          muted
          playsInline
          preload='metadata'
        />
      </div>
    );
  }

  if (preview?.image != null) {
    return (
      <div className={surface} aria-hidden>
        <Image
          src={preview.image}
          alt=''
          fill
          sizes={sizes ?? '(max-width: 590px) 90vw, 45vw'}
          className={media}
        />
      </div>
    );
  }

  return <div className={placeholder} aria-hidden />;
}

const surface = css({
  pos: 'relative',
  w: 'full',
  aspectRatio: '16 / 9',
  rounded: 'card',
  overflow: 'hidden',
  shadow: 'elevation1',
  bg: 'surface1',
});

const placeholder = css({
  w: 'full',
  aspectRatio: '16 / 9',
  rounded: 'card',
  overflow: 'hidden',
  border: '1px dashed',
  borderColor: 'slate6',
  bg: 'surface1',
  backgroundImage:
    'radial-gradient(circle, {colors.slate5} 1px, transparent 1px)',
  backgroundRepeat: 'round',
  backgroundSize: '20px 20px',
});

const media = css({
  pos: 'absolute',
  inset: 0,
  w: 'full',
  h: 'full',
  objectFit: 'cover',
});
