import { sprinkles } from '@/styles/sprinkles.css';
import { tokenVars } from '@/styles/tokens.css';

type SpaceKeys = keyof typeof tokenVars.space;

const createSpaceVariant = (property: string) =>
  Object.entries(tokenVars.space).reduce((acc, [key]) => {
    acc[key as SpaceKeys] = sprinkles({ [property]: key });
    return acc;
  }, {} as Record<SpaceKeys, string>);

export const GAP = createSpaceVariant('gap');
export const COLUMN_GAP = createSpaceVariant('columnGap');
export const ROW_GAP = createSpaceVariant('rowGap');
