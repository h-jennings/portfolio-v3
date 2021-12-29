import { styled } from '@/stitches.config';
import { ReactComponent as CloseIcon } from '@assets/svg/close-icon.svg';
import { Box } from '@components/Box';
import { buttonReset } from '@components/Button';
import { Flex } from '@components/Flex';
import { Stack } from '@components/Stack';
import { focus, H1, Link, ListItem } from '@components/Text';
import { DEFAULT_SPRING_ANIMATION } from '@utils/constants/animation.constants';
import { NAVIGATION_DATA } from '@utils/constants/navigation.constants';
import { PATHS } from '@utils/constants/paths.constants';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

const drawerContainerVariants = {
  open: {
    x: '0%',
    transition: {
      ...DEFAULT_SPRING_ANIMATION,
    },
  },
  closed: {
    x: '100%',
    transition: {
      ...DEFAULT_SPRING_ANIMATION,
    },
  },
};

const Container = styled(motion.div, {
  minHeight: '$screenH',
  zIndex: 2,
  left: 0,
  top: 0,
  position: 'fixed',
  '&:focus': {
    outline: 'none',
  },
});
const Wrapper = styled('div', {
  display: 'flex',
  width: '$screenW',
  height: 'var(--vh)',
  backgroundColor: '$surface2',
  position: 'relative',
  flexDirection: 'column',
});
const CloseButton = styled('button', buttonReset, focus, {
  height: 24,
  justifySelf: 'end',
  '> svg > *': {
    fill: '$surface1',
  },
});

const Controls = styled('div', {
  $$gutter: '$space$2',
  d: 'grid',
  py: '$3',
  px: '$2',
  jc: 'space-between',
  width: '$full',
  gtc: '1fr',
  position: 'relative',
  '&:after': {
    position: 'absolute',
    right: '$$gutter',
    bottom: 0,
    content: "''",
    width: 'calc($full - $$gutter * 2)',
    height: 1,
    backgroundColor: '$surface1',
  },
});
const ContactContainer = styled('div', {
  display: 'flex',
  $$gutter: '$space$2',
  jc: 'center',
  ai: 'center',
  flexDirection: 'column',
  position: 'relative',
  py: '$3',
  '&:before': {
    position: 'absolute',
    right: '$$gutter',
    top: 0,
    content: "''",
    width: 'calc($full - $$gutter * 2)',
    height: 1,
    backgroundColor: '$text3',
  },
});

interface DrawerProps {
  isOpen: boolean;
  closeFn: () => void;
}
export function Drawer({ isOpen, closeFn }: DrawerProps): JSX.Element {
  return (
    <Container
      data-drawer
      tabIndex={-1}
      variants={drawerContainerVariants}
      animate={isOpen ? 'open' : 'closed'}
      initial='closed'
    >
      <Wrapper>
        <Controls>
          <CloseButton onClick={closeFn}>
            <CloseIcon width='24px' />
          </CloseButton>
        </Controls>
        <Flex
          align='center'
          direction='row'
          justify='end'
          css={{
            height: '$full',
            flex: 1,
          }}
        >
          <Stack gap='m' as='ul' css={{ px: '$2' }}>
            <ListItem css={{ ta: 'right' }}>
              <NextLink passHref href={PATHS.home}>
                <Link size='3' color='4' onClick={closeFn}>
                  home
                </Link>
              </NextLink>
            </ListItem>
            {NAVIGATION_DATA.map(({ label, path }) => (
              <ListItem css={{ ta: 'right' }} key={label}>
                <NextLink passHref href={path}>
                  <Link size='3' color='4' onClick={closeFn}>
                    {label}
                  </Link>
                </NextLink>
              </ListItem>
            ))}
          </Stack>
        </Flex>
        <ContactContainer>
          <H1 size='1' color='3' css={{ ta: 'center' }}>
            CONTACT
          </H1>
          <Box css={{ height: 16, width: 1, bc: '$text3', my: '$1' }} />
          <Link href={PATHS.email} size='1' color='3' css={{ ta: 'center' }}>
            jenningsdhunter@gmail.com
          </Link>
        </ContactContainer>
      </Wrapper>
    </Container>
  );
}
