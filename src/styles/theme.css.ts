import {
  colorsDark,
  colorsLight,
} from '@utils/common/constants/colors.constants';
import {
  createGlobalTheme,
  createGlobalThemeContract,
} from '@vanilla-extract/css';

export const themeVars = createGlobalThemeContract(
  {
    colors: {
      ...colorsDark,
      uiBg: null,
      surface1: null,
      surface2: null,
      text1: null,
      text2: null,
      text3: null,
      text4: null,
    },
  },
  (_, path) => `${path.join('-')}`,
);

createGlobalTheme('html.dark-theme', themeVars, {
  colors: {
    ...colorsDark,
    uiBg: colorsDark.slate1,
    surface1: colorsDark.slate1,
    surface2: colorsDark.slate12,
    text1: 'white',
    text2: colorsDark.slate11,
    text3: colorsDark.gold9,
    text4: colorsDark.slate1,
  },
});

createGlobalTheme('html.light-theme', themeVars, {
  colors: {
    ...colorsLight,
    uiBg: colorsLight.slate1,
    surface1: colorsLight.slate1,
    surface2: colorsLight.slate12,
    text1: 'black',
    text2: colorsLight.slate11,
    text3: colorsLight.gold9,
    text4: colorsLight.slate1,
  },
});
