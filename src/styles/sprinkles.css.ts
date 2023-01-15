import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { BREAKPOINTS, ds } from './ds.css';

const { tokens, theme } = ds;
const spacesWithAuto = { ...tokens.space, auto: 'auto' };

const responsiveProperties = defineProperties({
  defaultCondition: 'initial',
  conditions: {
    initial: {},
    bp1: { '@media': BREAKPOINTS.bp1 },
    '<bp1': { '@media': BREAKPOINTS['<bp1'] },
    bp2: { '@media': BREAKPOINTS.bp2 },
    '<bp2': { '@media': BREAKPOINTS['<bp2'] },
    bp3: { '@media': BREAKPOINTS.bp3 },
    '<bp3': { '@media': BREAKPOINTS['<bp3'] },
    bp4: { '@media': BREAKPOINTS.bp4 },
    '<bp4': { '@media': BREAKPOINTS['<bp4'] },
  },
  properties: {
    position: ['relative', 'absolute', 'fixed', 'sticky'],
    display: [
      'none',
      'flex',
      'grid',
      'block',
      'inline',
      'inline-block',
      'inline-grid',
      'inline-flex',
    ],
    flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
    justifyItems: ['start', 'end', 'center', 'stretch'],
    justifyContent: [
      'stretch',
      'flex-start',
      'start',
      'center',
      'flex-end',
      'end',
      'space-around',
      'space-between',
    ],
    alignItems: [
      'baseline',
      'stretch',
      'flex-start',
      'start',
      'end',
      'center',
      'flex-end',
    ],
    alignContent: ['start', 'end', 'center'],
    padding: tokens.space,
    paddingTop: tokens.space,
    paddingBottom: tokens.space,
    paddingLeft: tokens.space,
    paddingRight: tokens.space,
    margin: spacesWithAuto,
    marginTop: spacesWithAuto,
    marginBottom: spacesWithAuto,
    marginLeft: spacesWithAuto,
    marginRight: spacesWithAuto,
    gap: tokens.space,
    columnGap: tokens.space,
    rowGap: tokens.space,
    height: tokens.sizes,
    width: tokens.sizes,
    maxHeight: tokens.sizes,
    maxWidth: tokens.sizes,
    minHeight: tokens.sizes,
    minWidth: tokens.sizes,
    fontSize: tokens.fontSizes,
    textAlign: ['left', 'center', 'right'],
  },
  shorthands: {
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },
});

const nonResponsiveProperties = defineProperties({
  properties: {
    borderRadius: tokens.radii,
    zIndex: tokens.zIndices,
    lineHeight: tokens.lineHeights,
    fontWeight: tokens.fontWeights,
    transition: tokens.transitions,
    fontFamily: tokens.fonts,
    flexWrap: ['wrap', 'nowrap'],
    top: tokens.space,
    bottom: tokens.space,
    left: tokens.space,
    right: tokens.space,
    shorthands: {
      inset: ['top', 'bottom', 'left', 'right'],
    },
  },
});

const interactiveProperties = defineProperties({
  defaultCondition: 'initial',
  conditions: {
    initial: {},
    hover: { selector: '&:hover' },
  },
  properties: {
    color: theme.colors,
    backgroundColor: theme.colors,
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  nonResponsiveProperties,
  interactiveProperties,
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
