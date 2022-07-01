import { styled } from '@/stitches.config';
import { PATHS } from '@utils/common/constants/paths.constants';
import { parseTagsToString } from '@utils/common/helpers/string.helpers';
import { ProjectMeta } from '@utils/work/constants/projects.constants';
import Image from 'next/image';
import NextLink from 'next/link';
import { Box } from './Box';
import { LinkBox, LinkOverlay } from './LinkBox';
import { Stack } from './Stack';
import { H3, Paragraph } from './Text';

interface ProjectCardProps {
  project: ProjectMeta;
}
export const ProjectCard = ({
  project: { tags, project, path, featureImageNarrow: featureImage },
}: ProjectCardProps) => {
  const tagsString = parseTagsToString(tags);

  return (
    <LinkBox>
      <Stack gap='s'>
        <ProjectImageContainer>
          <Image
            src={featureImage}
            priority
            alt=''
            layout='responsive'
            blurDataURL={featureImage}
            placeholder='blur'
            width={220}
            height={275}
            quality={95}
          />
        </ProjectImageContainer>
        <Box css={{ px: '$3xs' }}>
          <NextLink passHref href={`${PATHS.work}/[project]`} as={path}>
            <LinkOverlay data-testid={path} style={{ display: 'inline-block' }}>
              <H3 leading='tight' size='1' css={{ pb: '$3xs' }}>
                {project}
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
