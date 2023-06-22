import { ProjectFragmentFragment } from '@/graphql/generated/cms.generated';
import { HygraphImageWithLoader } from '@components/common/HygraphImageWithLoader';
import { PATHS } from '@utils/common/constants/paths.constants';
import { parseTagsToString } from '@utils/common/helpers/string.helpers';
import { css, cx } from 'ds/css';
import { linkBox, linkOverlay, stack } from 'ds/patterns';
import Link from 'next/link';
import { AspectRatioRoot } from './aspect-ratio';
import { skeleton } from '../_styles/skeleton';

interface ProjectCardProps {
  project: ProjectFragmentFragment;
  sizes?: string;
}
export const ProjectCard = ({ project, sizes = '100vw' }: ProjectCardProps) => {
  const { featureMediaNarrow, slug, category, name } = project;
  const tagsString = parseTagsToString(category);
  const src = featureMediaNarrow.url;

  return (
    <div className={linkBox()}>
      <div className={stack({ gap: 's' })}>
        <div
          className={css({
            rounded: 'card',
            bgColor: 'slate8',
            pos: 'relative',
            overflow: 'hidden',
          })}
        >
          <AspectRatioRoot ratio={220 / 275} style={{ position: 'relative' }}>
            <HygraphImageWithLoader
              src={src}
              priority
              alt=''
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
              sizes={sizes}
            />
          </AspectRatioRoot>
        </div>
        <div className={css({ px: '3xs' })}>
          <Link
            className={linkOverlay({ display: 'inline-block' })}
            href={`${PATHS.work}/${slug}`}
            data-testid={slug}
          >
            <h3
              className={css({
                textStyle: 'base',
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
