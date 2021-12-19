import { styled } from '@/stitches.config';

const Table = styled('table', {
  width: '$full',
  tableLayout: 'fixed',
  borderSpacing: 0,
});
const Th = styled('th', {
  fontWeight: 'unset',
  textTransform: 'uppercase',
  textAlign: 'start',
  fontSize: '$1',
  color: '$text3',
  py: '$2',
  variants: {
    border: {
      true: {
        borderBottom: '1px solid $slate8',
      },
    },
    align: {
      start: {
        textAlign: 'start',
      },
      center: {
        textAlign: 'center',
      },
      end: {
        textAlign: 'end',
      },
    },
  },
  defaultVariants: {
    align: 'start',
    border: true,
  },
});
const Td = styled('td', {
  textAlign: 'start',
  fontSize: '$2',
  color: '$text2',
  py: '$3',
  variants: {
    border: {
      true: {
        borderBottom: '1px solid $slate8',
      },
    },
    align: {
      start: {
        textAlign: 'start',
      },
      center: {
        textAlign: 'center',
      },
      end: {
        textAlign: 'end',
      },
    },
  },
  defaultVariants: {
    align: 'start',
    border: true,
  },
});
const Thead = styled('thead', {
  width: '$full',
});
const Tbody = styled('tbody', {
  width: '$full',
});
const Tr = styled('tr');

export { Table, Thead, Th, Tbody, Td, Tr };
