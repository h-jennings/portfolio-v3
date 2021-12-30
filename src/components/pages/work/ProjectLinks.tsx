import { styled } from '@/stitches.config';
import { ReactComponent as ArrowIcon } from '@assets/svg/arrow-icon.svg';
import { PATHS } from '@utils/constants/paths.constants';
import { ProjectMeta } from '@utils/constants/projects.constants';
import { prevNextProjectData } from '@utils/helpers/prev-next-project-data.helpers';
import isNull from 'lodash/fp/isNull';
import NextLink from 'next/link';
import React from 'react';
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
  subTitle: string;
  arrowDirection: 'left' | 'right';
  alignment: 'left' | 'right' | 'center';
}
export function ProjectLink({
  meta,
  subTitle,
  arrowDirection,
  alignment,
}: LinkProps): JSX.Element {
  const justify = React.useMemo(() => {
    return ALIGNMENT_LOOKUP[alignment];
  }, [alignment]);

  const headerUi = React.useMemo(() => {
    switch (arrowDirection) {
      case 'left': {
        return (
          <Stack direction='row' gap='m' style={{ justifyContent: justify }}>
            <ArrowIcon style={{ transform: 'rotate(90deg)' }} width='20px' />
            <Text size={{ '@initial': '1', '@bp3': '2' }}>{subTitle}</Text>
          </Stack>
        );
      }
      case 'right': {
        return (
          <Stack direction='row' gap='m' style={{ justifyContent: justify }}>
            <Text size={{ '@initial': '1', '@bp3': '2' }}>{subTitle}</Text>
            <ArrowIcon style={{ transform: 'rotate(-90deg)' }} width='20px' />
          </Stack>
        );
      }
    }
  }, [subTitle, arrowDirection, justify]);

  return (
    <LinkContainer
      style={{
        justifyContent: justify,
      }}
    >
      <LinkBox>
        <Stack gap='m' css={{ jc: justify, py: '$3', '@bp3': { py: '$5' } }}>
          {headerUi}
          <NextLink passHref href={`${PATHS.work}/[project]`} as={meta.path}>
            <LinkOverlay>
              <Text leading='body' size={{ '@initial': '2', '@bp3': '3' }}>
                {meta.project}
              </Text>
            </LinkOverlay>
          </NextLink>
        </Stack>
      </LinkBox>
    </LinkContainer>
  );
}

const LinksContainer = styled('div', {
  d: 'flex',
  [`> ${LinkContainer}`]: {
    flex: 1,
    d: 'flex',
    jc: 'center',
  },
  position: 'relative',
  borderTop: '1px solid $slate8',
  borderBottom: '1px solid $slate8',
  '> :nth-child(2n)': {
    position: 'relative',
  },
  '> :nth-child(2n):before': {
    content: "''",
    position: 'absolute',
    left: 0,
    top: 0,
    height: '$full',
    width: '1px',
    backgroundColor: '$slate8',
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
          subTitle='Previous'
        />
      ) : null}
      {next ? (
        <ProjectLink
          arrowDirection='right'
          alignment={shouldCenter ? 'center' : 'right'}
          meta={next}
          subTitle='Next'
        />
      ) : null}
    </LinksContainer>
  );
}
