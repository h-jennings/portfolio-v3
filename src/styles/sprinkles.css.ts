import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { themeVars } from './theme.css';
import { BREAKPOINTS, tokenVars } from './tokens.css';

const spacesWithAuto = { ...tokenVars.space, auto: 'auto' };

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
    padding: tokenVars.space,
    paddingTop: tokenVars.space,
    paddingBottom: tokenVars.space,
    paddingLeft: tokenVars.space,
    paddingRight: tokenVars.space,
    margin: spacesWithAuto,
    marginTop: spacesWithAuto,
    marginBottom: spacesWithAuto,
    marginLeft: spacesWithAuto,
    marginRight: spacesWithAuto,
    gap: tokenVars.space,
    columnGap: tokenVars.space,
    rowGap: tokenVars.space,
    height: tokenVars.sizes,
    width: tokenVars.sizes,
    maxHeight: tokenVars.sizes,
    maxWidth: tokenVars.sizes,
    minHeight: tokenVars.sizes,
    minWidth: tokenVars.sizes,
    fontSize: tokenVars.fontSizes,
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
    borderRadius: tokenVars.radii,
    zIndex: tokenVars.zIndices,
    lineHeight: tokenVars.lineHeights,
    fontWeight: tokenVars.fontWeights,
    transition: tokenVars.transitions,
    fontFamily: tokenVars.fonts,
    flexWrap: ['wrap', 'nowrap'],
    top: tokenVars.space,
    bottom: tokenVars.space,
    left: tokenVars.space,
    right: tokenVars.space,
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
    color: themeVars.colors,
    backgroundColor: themeVars.colors,
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  nonResponsiveProperties,
  interactiveProperties,
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
