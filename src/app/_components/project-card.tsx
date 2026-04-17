import { PATHS } from '@/app/_utils/constants/paths.constants';
import { type Project } from '@/app/_utils/content';
import { parseTagsToString } from '@/app/_utils/helpers/string.helpers';
import { css, cx } from 'ds/css';
import { linkBox, linkOverlay, stack } from 'ds/patterns';
import Link from 'next/link';
import { skeleton } from '../_styles/skeleton';
import { AspectRatioRoot } from './aspect-ratio';
import { ProjectImage } from './project-image';

interface ProjectCardProps {
  project: Project;
  sizes?: string;
}
export const ProjectCard = ({ project, sizes = '100vw' }: ProjectCardProps) => {
  const { featuredMediaNarrow, slug, category, name } = project;
  const tagsString = parseTagsToString(category);

  return (
    <div className={linkBox()}>
      <div
        className={stack({
          gap: 's',
          '&:has([data-slot="project-card-link"]:hover) [data-slot="project-card-media"]':
            {
              transform: 'scale(1.02)',
            },
          '&:has([data-slot="project-card-link"]:active) [data-slot="project-card-media"]':
            {
              transform: 'scale(0.98)',
            },
        })}
      >
        <div
          className={css({
            transition: 'transform 150ms ease',
            transform: 'scale(1)',
            transformOrigin: 'center',
            rounded: 'card',
            overflow: 'clip',
          })}
          data-slot='project-card-media'
        >
          <div
            className={css({
              rounded: 'card',
              bgColor: 'slate8',
              pos: 'relative',
              overflow: 'hidden',
            })}
          >
            <AspectRatioRoot ratio={220 / 275} style={{ position: 'relative' }}>
              <ProjectImage
                src={featuredMediaNarrow.url}
                preload={true}
                alt={featuredMediaNarrow.alt}
                fill
                style={{ objectFit: 'cover' }}
                quality={100}
                sizes={sizes}
              />
            </AspectRatioRoot>
          </div>
        </div>
        <div className={css({ px: '3xs' })}>
          <Link
            className={linkOverlay({ display: 'inline-block' })}
            href={`${PATHS.work}/${slug}`}
            data-testid={slug}
            data-slot='project-card-link'
          >
            <h3
              className={css({
                textStyle: 'base',
                textWrap: 'balance',
                lineHeight: 'tight',
                fontSize: '1',
                pb: '3xs',
              })}
            >
              {name}
            </h3>
          </Link>
          <p
            className={css({
              textStyle: 'base',
              color: 'text2',
              fontSize: '1',
            })}
          >
            {tagsString}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ProjectCardLoadingUI = () => {
  return (
    <div className={stack({ gap: 's' })}>
      <div className={cx(skeleton({ type: 'card' }), css({ w: 'full' }))}>
        <AspectRatioRoot ratio={220 / 275} />
      </div>
      <div className={stack({ gap: '3xs' })}>
        <span
          aria-hidden
          className={cx(
            skeleton({ type: 'text' }),
            css({
              display: 'block',
              textStyle: 'base',
              lineHeight: 'tight',
              fontSize: '1',
              color: 'transparent',
              w: '2/3',
            }),
          )}
        >
          H
        </span>
        <span
          aria-hidden
          className={cx(
            skeleton({ type: 'text' }),
            css({
              w: '1/3',
              display: 'block',
              textStyle: 'base',
              color: 'transparent',
              fontSize: '1',
            }),
          )}
        >
          J
        </span>
      </div>
    </div>
  );
};
