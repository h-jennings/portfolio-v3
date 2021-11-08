import { PATHS } from '@/constants/paths';
import { ProjectMeta } from '@/constants/projects';
import { prevNextProjectData } from '@/helpers/prev-next-project-data';
import { css } from '@/stitches.config';
import { ReactComponent as ArrowIcon } from '@assets/svg/arrow-icon.svg';
import { isNull } from 'lodash';
import NextLink from 'next/link';
import React from 'react';
import { LinkBox, LinkOverlay } from './primitives/LinkBox';
import { Stack } from './primitives/Stack';
import { Text } from './primitives/Text';

const alignmentLookup = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

interface LinkProps {
  meta: ProjectMeta;
  subTitle: string;
  arrowDirection: 'left' | 'right';
  alignment: 'left' | 'right' | 'center';
}
export function Link({
  meta,
  subTitle,
  arrowDirection,
  alignment,
}: LinkProps): JSX.Element {
  const justify = React.useMemo(() => {
    return alignmentLookup[alignment];
  }, [alignment]);

  const headerUi = React.useMemo(() => {
    switch (arrowDirection) {
      case 'left': {
        return (
          <Stack direction='row' gap='1' css={{ jc: justify }}>
            <ArrowIcon style={{ transform: 'rotate(90deg)' }} width='24px' />
            <Text>{subTitle}</Text>
          </Stack>
        );
      }
      case 'right': {
        return (
          <Stack direction='row' gap='1' css={{ jc: justify }}>
            <Text>{subTitle}</Text>
            <ArrowIcon style={{ transform: 'rotate(-90deg)' }} width='24px' />
          </Stack>
        );
      }
    }
  }, [subTitle, arrowDirection, justify]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: justify,
      }}
    >
      <LinkBox>
        <Stack gap='1' css={{ jc: justify, py: '$5' }}>
          {headerUi}
          <NextLink passHref href={`${PATHS.work}/[project]`} as={meta.path}>
            <LinkOverlay>
              <Text
                size={{ '@initial': '2', '@bp3': '3' }}
                css={{ lineHeight: '$body' }}
              >
                {meta.project}
              </Text>
            </LinkOverlay>
          </NextLink>
        </Stack>
      </LinkBox>
    </div>
  );
}

const container = css({
  d: 'flex',
  '> div': {
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
    <div className={container()}>
      {previous ? (
        <Link
          arrowDirection='left'
          alignment={shouldCenter ? 'center' : 'left'}
          meta={previous}
          subTitle='Previous'
        />
      ) : null}
      {next ? (
        <Link
          arrowDirection='right'
          alignment={shouldCenter ? 'center' : 'right'}
          meta={next}
          subTitle='Next'
        />
      ) : null}
    </div>
  );
}
