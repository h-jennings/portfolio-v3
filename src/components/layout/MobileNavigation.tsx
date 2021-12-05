import { styled } from '@/stitches.config';
import { ReactComponent as MenuIcon } from '@assets/svg/mobile-menu.svg';
import { useMachine } from '@xstate/react';
import { Box } from '../Box';
import { buttonReset } from '../Button';
import { Availability } from './Availability';
import { Drawer } from './Drawer/Drawer';
import { drawerMachine } from './Drawer/drawer-machine';

const Navigation = styled('nav', {
  py: '$3',
  display: 'flex',
  alignItems: 'center',
  jc: 'space-between',
  zIndex: 1,
});

const MenuWrapper = styled('div', {
  '> svg > *': {
    fill: '$text1',
  },
});
export function MobileNavigation(): JSX.Element {
  const [state, send] = useMachine(drawerMachine);
  return (
    <Box css={{ position: 'relative', zIndex: 2 }}>
      <Navigation>
        <Availability status='inactive' />
        <button onClick={() => send('OPEN')} className={buttonReset()}>
          <MenuWrapper>
            <MenuIcon width='48px' height='8px' />
          </MenuWrapper>
        </button>
      </Navigation>
      <Drawer isOpen={state.matches('opened')} closeFn={() => send('CLOSE')} />
    </Box>
  );
}
