import { FragmentType, useFragment } from '@/graphql/generated';
import { stack } from '@/styles/primitives/stack.css';
import { text } from '@/styles/primitives/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { PATHS } from '@utils/common/constants/paths.constants';
import { parseTagsToString } from '@utils/common/helpers/string.helpers';
import { ProjectFragment } from '@utils/common/hooks/use-get-projects';
import clsx from 'clsx';
import { HygraphImageWithLoader } from './HygraphImageWithLoader';
import { LinkBox } from './LinkBox/LinkBox';

interface ProjectCardProps {
  project: FragmentType<typeof ProjectFragment>;
  sizes?: string;
}
export const ProjectCard = ({ project, sizes = '100vw' }: ProjectCardProps) => {
  const projectData = useFragment(ProjectFragment, project);
  const { featureMediaNarrow, slug, category, name } = projectData;
  const tagsString = parseTagsToString(category);
  const src = featureMediaNarrow.url;

  return (
    <LinkBox.Root>
      <div className={stack({ gap: 's' })}>
        <div
          className={sprinkles({
            borderRadius: 'card',
            backgroundColor: 'slate8',
            position: 'relative',
          })}
          style={{ overflow: 'hidden' }}
        >
          <AspectRatio.Root ratio={220 / 275}>
            <HygraphImageWithLoader
              src={src}
              priority
              alt=''
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
              sizes={sizes}
            />
          </AspectRatio.Root>
        </div>
        <div className={sprinkles({ paddingX: '3xs' })}>
          <LinkBox.Target
            href={`${PATHS.work}/${slug}`}
            data-testid={slug}
            style={{ display: 'inline-block' }}
          >
            <h3
              className={clsx(
                text({ leading: 'tight', size: '1' }),
                sprinkles({ paddingBottom: '3xs' }),
              )}
            >
              {name}
            </h3>
          </LinkBox.Target>
          <p className={text({ color: '2', size: '1' })}>{tagsString}</p>
        </div>
      </div>
    </LinkBox.Root>
  );
};
