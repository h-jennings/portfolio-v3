import { css } from '@/stitches.config';
import { ReactComponent as MenuIcon } from '@assets/svg/mobile-menu.svg';
import { useMachine } from '@xstate/react';
import { buttonReset } from '../Button';
import { Availability } from './Availability';
import { Drawer } from './Drawer/Drawer';
import { drawerMachine } from './Drawer/drawer-machine';

const navigation = css({
  py: '$3',
  display: 'flex',
  alignItems: 'center',
  jc: 'space-between',
  zIndex: 1,
});

const wrapper = css({
  position: 'relative',
  zIndex: 2,
});

const menuWrapper = css({
  '> svg > *': {
    fill: '$text1',
  },
});
export function MobileNavigation(): JSX.Element {
  const [state, send] = useMachine(drawerMachine);
  return (
    <div className={wrapper()}>
      <nav className={navigation()}>
        <Availability status='inactive' />
        <button onClick={() => send('OPEN')} className={buttonReset()}>
          <div className={menuWrapper()}>
            <MenuIcon width='48px' height='8px' />
          </div>
        </button>
      </nav>
      <Drawer isOpen={state.matches('opened')} closeFn={() => send('CLOSE')} />
    </div>
  );
}