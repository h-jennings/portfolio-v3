import { WithChildren } from '@common/utils/types/with-children';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { LinkBox, LinkOverlay } from './LinkBox';
import { Stack } from './Stack';
import { Text } from './Text';

interface BackToLinkProps {
  href: string;
}

export const BackToLink = ({
  children,
  href,
}: BackToLinkProps & WithChildren): JSX.Element => {
  return (
    <LinkBox>
      <Stack css={{ mb: '$m' }} direction='row' gap='xs'>
        <ArrowLeftIcon color='var(--colors-text1)' width={15} aria-hidden />
        <NextLink href={href} passHref>
          <LinkOverlay style={{ display: 'flex' }}>
            <Text leading='tight' css={{ fontSize: 12 }}>
              {children}
            </Text>
          </LinkOverlay>
        </NextLink>
      </Stack>
    </LinkBox>
  );
};
