import { GetProjectsQuery } from '@/graphql/generated/types.generated';
import { stack } from '@/styles/elements/stack.css';
import { text } from '@/styles/elements/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { PATHS } from '@utils/common/constants/paths.constants';
import { parseTagsToString } from '@utils/common/helpers/string.helpers';
import clsx from 'clsx';
import { HygraphImageWithLoader } from './HygraphImageWithLoader';
import { LinkBox } from './LinkBox/LinkBox';

interface ProjectCardProps {
  project: GetProjectsQuery['projects'][0];
  sizes?: string;
}
export const ProjectCard = ({ project, sizes = '100vw' }: ProjectCardProps) => {
  const { featureMediaNarrow, slug, category, name } = project;
  const tagsString = parseTagsToString(category);
  const src = featureMediaNarrow.url;

  return (
    <LinkBox.Root>
      <div className={stack({ gap: 's' })}>
        <div
          className={sprinkles({
            borderRadius: 'card',
            backgroundColor: 'slate8',
          })}
          style={{ overflow: 'hidden' }}
        >
          <HygraphImageWithLoader
            src={src}
            priority
            alt=''
            layout='responsive'
            blurDataURL={src}
            placeholder='blur'
            width={220}
            height={275}
            quality={100}
            sizes={sizes}
          />
        </div>
        <div className={sprinkles({ paddingX: '3xs' })}>
          <LinkBox.Target
            href={`${PATHS.work}/[project]`}
            as={`${PATHS.work}/${slug}`}
            data-testid={slug}
            style={{ display: 'inline-block' }}
          >
            <h3
              className={clsx(
                text({ leading: 'tight', size: 1 }),
                sprinkles({ paddingBottom: '3xs' }),
              )}
            >
              {name}
            </h3>
          </LinkBox.Target>
          <p className={text({ color: 2, size: 1 })}>{tagsString}</p>
        </div>
      </div>
    </LinkBox.Root>
  );
};
