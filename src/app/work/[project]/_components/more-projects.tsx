import { getProjects } from '@/app/work/_helpers/projects';
import ArrowLeftIcon from '@components/common/icons/ArrowLeftIcon';
import ArrowRightIcon from '@components/common/icons/ArrowRightIcon';
import { PATHS } from '@utils/common/constants/paths.constants';
import { css, cx } from 'ds/css';
import { flex, hstack, linkBox, linkOverlay } from 'ds/patterns';
import { link } from 'ds/recipes';
import { token } from 'ds/tokens';
import Link from 'next/link';

export const MoreProjects = async ({ current }: { current: string }) => {
  const { projects } = await getProjects();
  const currentProjectIndex = projects.findIndex((p) => p.slug === current);

  const [previous, next] = prevNextProjectData(currentProjectIndex, projects);

  const shouldCenter = isFalsy(previous) || isFalsy(next);

  return (
    <div
      className={flex({
        py: 'm',
        borderTop: '1px dashed',
        borderBottom: '1px dashed',
        borderColor: 'slate8',
      })}
    >
      {previous ? (
        <ProjectLink
          key={previous.id}
          arrowDirection='left'
          alignment={shouldCenter ? 'center' : 'left'}
          slug={previous.slug}
          name={previous.name}
        />
      ) : null}
      {next ? (
        <ProjectLink
          key={next.id}
          arrowDirection='right'
          alignment={shouldCenter ? 'center' : 'right'}
          slug={next.slug}
          name={next.name}
        />
      ) : null}
    </div>
  );
};

interface LinkProps {
  slug: string;
  name: string;
  arrowDirection: 'left' | 'right';
  alignment: 'left' | 'right' | 'center';
}

const ProjectLink = ({
  slug,
  name,
  arrowDirection,
  alignment,
}: LinkProps): JSX.Element => {
  const justify = ALIGNMENT_LOOKUP[alignment];
  return (
    <div
      className={flex({
        flex: '1',
        h: 'full',
        w: 'full',
        justify: 'center',
      })}
      style={{
        justifyContent: justify,
      }}
    >
      <div className={linkBox()}>
        <div
          className={hstack({
            gap: 's',
            justify: alignment,
          })}
        >
          {arrowDirection === 'left' ? (
            <ArrowLeftIcon
              aria-hidden
              width={15}
              color={token('colors.text1')}
            />
          ) : null}
          <Link
            href={`${PATHS.work}/${slug}`}
            className={cx(linkOverlay(), link())}
          >
            <span
              className={css({
                lineHeight: 'tight',
                fontSize: '2',
                color: 'inherit',
              })}
            >
              {name}
            </span>
          </Link>
          {arrowDirection === 'right' ? (
            <ArrowRightIcon
              aria-hidden
              width={15}
              color={token('colors.text1')}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

function prevNextProjectData<T extends unknown[]>(
  idx: number,
  projects: T,
): [T[number] | null, T[number] | null] {
  const previousProject = idx > 0 ? projects[idx - 1] : null;
  const nextProject = idx < projects.length - 1 ? projects[idx + 1] : null;
  return [previousProject, nextProject];
}

const isFalsy = (val: any) => {
  return val == null;
};

const ALIGNMENT_LOOKUP = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
} as const;
