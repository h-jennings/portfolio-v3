import { AspectRatioRoot } from '@/app/_components/aspect-ratio';
import { ProjectImage } from '@/app/_components/project-image';
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  barStyles,
  rootStyles,
  thumbStyles,
  viewportStyles,
} from '@/app/_components/scroll-area';
import { type ProjectMedia } from '@/app/_utils/content';
import { css, cva } from 'ds/css';

interface ProjectGalleryProps {
  media: Array<ProjectMedia>;
}

export const ProjectGallery = ({ media }: ProjectGalleryProps) => {
  return (
    <ScrollAreaRoot className={rootStyles}>
      <ScrollAreaScrollbar className={barStyles} orientation='horizontal'>
        <ScrollAreaThumb className={thumbStyles} />
      </ScrollAreaScrollbar>
      <ScrollAreaViewport className={viewportStyles}>
        <div
          className={css({
            mb: { bp1Down: 'l' },
            display: 'grid',
            gap: 's',
            gridTemplateColumns: 'repeat(3, 40%)',
            bp1: {
              gridTemplateColumns: 'repeat(3, 1fr)',
            },
          })}
        >
          {media.map((item, idx) => {
            if (item.mediaType == null) return null;
            const isEven = (idx + 1) % 2 === 0;
            const width = isEven ? 220 : 460;
            const height = 275;

            const position = (idx % 3) as 0 | 1 | 2;
            const sizes = [
              '(max-width: 519px) 78vw, (max-width: 740px) 60vw, 460px',
              '(max-width: 519px) 38vw, (max-width: 740px) 30vw, 220px',
              '(max-width: 519px) 120vw, (max-width: 740px) 100vw, 418px',
            ] as const;

            return (
              <div className={mediaContainer({ item: position })} key={idx}>
                {item.mediaType === 'IMAGE' ? (
                  <AspectRatioRoot ratio={width / height}>
                    <ProjectImage
                      src={item.url}
                      alt={item.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      quality={100}
                      sizes={sizes[position]}
                    />
                  </AspectRatioRoot>
                ) : (
                  <AspectRatioRoot ratio={width / height}>
                    <video
                      src={item.url}
                      style={{ objectFit: 'cover', height: '100%' }}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls={false}
                    />
                  </AspectRatioRoot>
                )}
              </div>
            );
          })}
        </div>
      </ScrollAreaViewport>
    </ScrollAreaRoot>
  );
};

const mediaContainer = cva({
  base: {
    isolation: 'isolate',
    overflow: 'hidden',
    rounded: 'card',
    h: 'full',
    bgColor: 'slate8',
  },
  variants: {
    item: {
      0: {
        gridColumn: '1 / span 2',
      },
      1: {
        gridColumn: '3 / -1',
      },
      2: {
        gridColumn: '1 / -1',
      },
    },
  },
});
