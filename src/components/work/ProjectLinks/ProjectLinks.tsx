import { ds } from '@/styles/ds.css';
import { link } from '@/styles/elements/link.css';
import { stack } from '@/styles/primitives/stack.css';
import { text } from '@/styles/primitives/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { ArrowLeftIcon } from '@components/common/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@components/common/icons/ArrowRightIcon';
import { LinkBox } from '@components/common/LinkBox/LinkBox';
import { PATHS } from '@utils/common/constants/paths.constants';
import { ProjectsMeta } from '@utils/common/types/cms.types';
import { prevNextProjectData } from '@utils/work/helpers/prev-next-project-data.helpers';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import * as s from './ProjectLinks.css';

const isNull = (val: any) => {
  return val == null;
};

interface ProjectLinksProps {
  projectIndex: number;
  projectsMeta: ProjectsMeta | undefined;
}
export const ProjectLinks = ({
  projectIndex,
  projectsMeta,
}: ProjectLinksProps): JSX.Element => {
  const [previous, next] = prevNextProjectData(projectIndex, projectsMeta);
  const shouldCenter = isNull(previous) || isNull(next);

  return (
    <div className={s.root}>
      {previous ? (
        <ProjectLink
          key={previous.id}
          arrowDirection='left'
          alignment={shouldCenter ? 'center' : 'left'}
          meta={previous}
        />
      ) : null}
      {next ? (
        <ProjectLink
          key={next.id}
          arrowDirection='right'
          alignment={shouldCenter ? 'center' : 'right'}
          meta={next}
        />
      ) : null}
    </div>
  );
};

interface LinkProps {
  meta: ProjectsMeta[number];
  arrowDirection: 'left' | 'right';
  alignment: 'left' | 'right' | 'center';
}

const ProjectLink = ({
  meta,
  arrowDirection,
  alignment,
}: LinkProps): JSX.Element => {
  const linkOverlayRef = React.useRef<HTMLAnchorElement>(null);
  const justify = ALIGNMENT_LOOKUP[alignment];
  const { asPath } = useRouter();
  const { slug, name } = meta;

  return (
    <div
      className={s.link.root}
      style={{
        justifyContent: justify,
      }}
    >
      <LinkBox.Root>
        <div
          className={clsx(
            sprinkles({ alignItems: 'center' }),
            stack({
              inline: true,
              gap: 's',
              orientation: 'horizontal',
              justify: alignment,
            }),
          )}
        >
          {arrowDirection === 'left' ? (
            <ArrowLeftIcon
              aria-hidden
              width={15}
              color={ds.theme.colors.text1}
            />
          ) : null}
          <LinkBox.Target
            href={`${PATHS.work}/[project]`}
            as={slug}
            key={asPath}
            ref={linkOverlayRef}
            className={link()}
          >
            <span
              className={text({ leading: 'tight', size: '2' })}
              style={{ color: 'inherit' }}
            >
              {name}
            </span>
          </LinkBox.Target>
          {arrowDirection === 'right' ? (
            <ArrowRightIcon
              aria-hidden
              width={15}
              color={ds.theme.colors.text1}
            />
          ) : null}
        </div>
      </LinkBox.Root>
    </div>
  );
};

const ALIGNMENT_LOOKUP = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
} as const;
