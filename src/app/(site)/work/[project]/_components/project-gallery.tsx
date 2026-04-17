'use client';

import { Lightbox, useLightbox } from '@/app/_components/lightbox/lightbox';
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
import { css, cva } from 'ds/css';
import * as React from 'react';

export const ProjectGallery = () => {
  const { items, open } = useLightbox();

  return (
    <React.Fragment>
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
            {items.map((item, idx) => {
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
                <button
                  onClick={() => open(idx)}
                  className={mediaContainer({ item: position })}
                  style={{ aspectRatio: `${width} / ${height}` }}
                  aria-label={`View ${item.alt} in gallery`}
                  key={idx}
                >
                  {item.mediaType === 'IMAGE' ? (
                    <ProjectImage
                      src={item.url}
                      alt={item.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      quality={100}
                      sizes={sizes[position]}
                    />
                  ) : (
                    <video
                      src={item.url}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls={false}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </ScrollAreaViewport>
      </ScrollAreaRoot>
      <Lightbox />
    </React.Fragment>
  );
};

const mediaContainer = cva({
  base: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '15px',
    bgColor: 'slate8',
    cursor: 'pointer',
    minWidth: 0,
    minHeight: 0,
    appearance: 'none',
    border: 'none',
    padding: 0,
  },
  variants: {
    item: {
      0: { gridColumn: '1 / span 2' },
      1: { gridColumn: '3 / -1' },
      2: { gridColumn: '1 / -1' },
    },
  },
});
