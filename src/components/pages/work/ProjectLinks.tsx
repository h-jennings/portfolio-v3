import { styled } from '@/stitches.config';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { PATHS } from '@utils/constants/paths.constants';
import { ProjectMeta } from '@utils/constants/projects.constants';
import { prevNextProjectData } from '@utils/helpers/prev-next-project-data.helpers';
import isNull from 'lodash/fp/isNull';
import NextLink from 'next/link';
import * as React from 'react';
import { LinkBox, LinkOverlay } from '../../LinkBox';
import { Stack } from '../../Stack';
import { Text } from '../../Text';

const ALIGNMENT_LOOKUP = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};
const LinkContainer = styled('div', {
  d: 'flex',
  height: '100%',
  width: '100%',
});
interface LinkProps {
  meta: ProjectMeta;
  arrowDirection: 'left' | 'right';
  alignment: 'left' | 'right' | 'center';
}
export function ProjectLink({
  meta,
  arrowDirection,
  alignment,
}: LinkProps): JSX.Element {
  const linkOverlayRef = React.useRef<HTMLAnchorElement>(null);
  const justify = React.useMemo(() => {
    return ALIGNMENT_LOOKUP[alignment];
  }, [alignment]);

  const clearFocus = () => {
    linkOverlayRef.current?.blur();
  };

  return (
    <LinkContainer
      style={{
        justifyContent: justify,
      }}
    >
      <LinkBox>
        <Stack
          gap='s'
          direction='row'
          css={{ jc: justify, py: '$3', '@bp3': { py: '$5' } }}
        >
          {arrowDirection === 'left' ? (
            <ArrowLeftIcon aria-hidden width={15} color='var(--colors-text1)' />
          ) : null}
          <NextLink passHref href={`${PATHS.work}/[project]`} as={meta.path}>
            <LinkOverlay ref={linkOverlayRef} onClick={() => clearFocus()}>
              <Text leading='body' size='2'>
                {meta.project}
              </Text>
            </LinkOverlay>
          </NextLink>
          {arrowDirection === 'right' ? (
            <ArrowRightIcon
              aria-hidden
              width={15}
              color='var(--colors-text1)'
            />
          ) : null}
        </Stack>
      </LinkBox>
    </LinkContainer>
  );
}

const LinksContainer = styled('div', {
  borderTop: '1px dashed $slate8',
  borderBottom: '1px dashed $slate8',
  py: '$m',
  d: 'flex',
  [`> ${LinkContainer}`]: {
    flex: 1,
    d: 'flex',
    jc: 'center',
  },
});
export function ProjectLinks({
  projectIndex,
}: {
  projectIndex: number;
}): JSX.Element {
  const [previous, next] = prevNextProjectData(projectIndex);
  const shouldCenter = React.useMemo(() => {
    return isNull(previous) || isNull(next);
  }, [previous, next]);

  return (
    <LinksContainer>
      {previous ? (
        <ProjectLink
          arrowDirection='left'
          alignment={shouldCenter ? 'center' : 'left'}
          meta={previous}
        />
      ) : null}
      {next ? (
        <ProjectLink
          arrowDirection='right'
          alignment={shouldCenter ? 'center' : 'right'}
          meta={next}
        />
      ) : null}
    </LinksContainer>
  );
}
