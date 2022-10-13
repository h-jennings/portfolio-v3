import { GetProjectsQuery } from '@/graphql/generated/types.generated';
import { styled } from '@/stitches.config';
import { PATHS } from '@utils/common/constants/paths.constants';
import { parseTagsToString } from '@utils/common/helpers/string.helpers';
import { transformImageUrl } from '@utils/common/helpers/transform-image-url.helpers';
import Image from 'next/image';
import NextLink from 'next/link';
import { Box } from './Box';
import { LinkBox, LinkOverlay } from './LinkBox';
import { Stack } from './Stack';
import { H3, Paragraph } from './Text';

interface ProjectCardProps {
  project: GetProjectsQuery['projects'][0];
}
export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { featureMediaNarrow, slug, category, name } = project;
  const tagsString = parseTagsToString(category);
  const src = transformImageUrl(featureMediaNarrow.url);

  return (
    <LinkBox>
      <Stack gap='s'>
        <ProjectImageContainer>
          <Image
            src={src}
            priority
            alt=''
            layout='responsive'
            blurDataURL={src}
            placeholder='blur'
            width={220}
            height={275}
            quality={100}
          />
        </ProjectImageContainer>
        <Box css={{ px: '$3xs' }}>
          <NextLink
            passHref
            href={`${PATHS.work}/[project]`}
            as={`${PATHS.work}/${slug}`}
          >
            <LinkOverlay data-testid={slug} style={{ display: 'inline-block' }}>
              <H3 leading='tight' size='1' css={{ pb: '$3xs' }}>
                {name}
              </H3>
            </LinkOverlay>
          </NextLink>
          <Paragraph color='2' size='1'>
            {tagsString}
          </Paragraph>
        </Box>
      </Stack>
    </LinkBox>
  );
};

const ProjectImageContainer = styled('div', {
  overflow: 'hidden',
  borderRadius: '$card',
  backgroundColor: '$slate8',
});
