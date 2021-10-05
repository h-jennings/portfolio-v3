import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { createMachine, interpret } from 'xstate';

interface DrawerContext {}
type DrawerEvent = { type: 'OPEN' } | { type: 'CLOSE' };
type DrawerTypeState =
  | { value: 'opened'; context: {} }
  | { value: 'closed'; context: {} };

export const drawerMachine = createMachine<
  DrawerContext,
  DrawerEvent,
  DrawerTypeState
>(
  {
    initial: 'closed',
    states: {
      closed: {
        on: {
          OPEN: 'opened',
        },
      },
      opened: {
        entry: ['lockBodyOnOpen'],
        on: {
          CLOSE: {
            target: 'closed',
            actions: ['unlockBodyOnClose'],
          },
        },
      },
    },
  },
  {
    actions: {
      lockBodyOnOpen: () => {
        disableBodyScroll(
          document.querySelector('[data-drawer]') as HTMLDivElement,
        );
      },
      unlockBodyOnClose: () => {
        clearAllBodyScrollLocks();
      },
    },
  },
);

export const drawerService = interpret(drawerMachine);
