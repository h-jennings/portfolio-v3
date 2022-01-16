import { WithChildren } from '@common/utils/types/with-children';
import { BackToLink } from './BackToLink';
import { Box } from './Box';
import { Stack } from './Stack';
import { PageHeader, Paragraph } from './Text';

export const ProseLayout = ({ children }: WithChildren) => {
  return (
    <Stack gap='xl' as='article'>
      {children}
    </Stack>
  );
};
export const ProseLayoutContent = ({ children }: WithChildren) => {
  return <div>{children}</div>;
};

interface ProseLayoutHeaderProps {
  backTo:
    | {
        hasLink: true;
        href: string;
        content: string;
      }
    | {
        hasLink: false;
      };
  headline?: string;
  description?: string;
}

export const ProseLayoutHeader = ({
  backTo = { hasLink: false },
  headline,
  description,
  children,
}: ProseLayoutHeaderProps & WithChildren) => {
  return (
    <Stack gap='xl'>
      <Box
        css={{
          borderBottom: '1px dashed $slate8',
          pb: '$xl',
        }}
      >
        <Box>
          {backTo.hasLink ? (
            <BackToLink href={backTo.href}>{backTo.content}</BackToLink>
          ) : null}
          <Stack gap='m'>
            <PageHeader>{headline}</PageHeader>
            <Paragraph css={{ maxWidth: '50ch' }} size='1' leading='body'>
              {description}
            </Paragraph>
            {children}
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};
