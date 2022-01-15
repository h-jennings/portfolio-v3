import { css, styled } from '@/stitches.config';
import { LinkBox, LinkOverlay } from '@common/components/LinkBox';
import { Stack } from '@common/components/Stack';
import { Text } from '@common/components/Text';
import { PATHS } from '@common/utils/constants/paths.constants';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { ProjectMeta } from '@work/utils/constants/projects.constants';
import { prevNextProjectData } from '@work/utils/helpers/prev-next-project-data.helpers';
import NextLink from 'next/link';
import * as React from 'react';

const isNull = (val: any) => {
  return val == null;
};

export const ProjectLinks = ({
  projectIndex,
}: {
  projectIndex: number;
}): JSX.Element => {
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
};

interface LinkProps {
  meta: ProjectMeta;
  arrowDirection: 'left' | 'right';
  alignment: 'left' | 'right' | 'center';
}

const ProjectLink = ({
  meta,
  arrowDirection,
  alignment,
}: LinkProps): JSX.Element => {
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
            <LinkOverlay
              ref={linkOverlayRef}
              className={hoverTextStyles()}
              onClick={() => clearFocus()}
            >
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
};

const LinkContainer = styled('div', {
  d: 'flex',
  height: '100%',
  width: '100%',
});

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

const hoverTextStyles = css({
  [`& ${Text}`]: {
    transition: '$default',
    transitionProperty: 'color',
  },
  hover: {
    [`& ${Text}`]: {
      color: '$slate11',
      transition: '$default',
      transitionProperty: 'color',
    },
  },
});

const ALIGNMENT_LOOKUP = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};
