import { css, styled } from '@/stitches.config';
import { ArrowLeftIcon } from '@components/common/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@components/common/icons/ArrowRightIcon';
import { LinkBox, LinkOverlay } from '@components/common/LinkBox';
import { Stack } from '@components/common/Stack';
import { Text } from '@components/common/Text';
import { PATHS } from '@utils/common/constants/paths.constants';
import { ProjectsMeta } from '@utils/common/types/cms.types';
import { prevNextProjectData } from '@utils/work/helpers/prev-next-project-data.helpers';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

const isNull = (val: any) => {
  return val == null;
};

export const ProjectLinks = ({
  projectIndex,
  projectsMeta,
}: {
  projectIndex: number;
  projectsMeta: ProjectsMeta | undefined;
}): JSX.Element => {
  const [previous, next] = prevNextProjectData(projectIndex, projectsMeta);
  const shouldCenter = isNull(previous) || isNull(next);

  return (
    <LinksContainer>
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
    </LinksContainer>
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
          <NextLink passHref href={`${PATHS.work}/[project]`} as={slug}>
            <LinkOverlay
              key={asPath}
              ref={linkOverlayRef}
              className={hoverTextStyles()}
            >
              <Text leading='body' size='2'>
                {name}
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
