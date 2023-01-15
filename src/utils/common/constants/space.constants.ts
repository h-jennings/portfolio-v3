import { ds } from '@/styles/ds.css';
import { sprinkles } from '@/styles/sprinkles.css';

type SpaceKeys = keyof typeof ds.tokens.space;

const createSpaceVariant = (property: string) =>
  Object.entries(ds.tokens.space).reduce((acc, [key]) => {
    acc[key as SpaceKeys] = sprinkles({ [property]: key });
    return acc;
  }, {} as Record<SpaceKeys, string>);

export const GAP = createSpaceVariant('gap');
export const COLUMN_GAP = createSpaceVariant('columnGap');
export const ROW_GAP = createSpaceVariant('rowGap');
