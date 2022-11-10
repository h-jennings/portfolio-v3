import { GetWritingsQuery } from '@/graphql/generated/types.generated';
import { compareDesc, format, parseISO } from 'date-fns';

export const getYearFromDate = (date: string): string => {
  return new Date(date).getFullYear().toString();
};
export const parseDateToString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};
export const parseDateToLongDateString = (date: string): string => {
  return format(parseISO(date), 'LLLL dd, yyyy ');
};

export const sortWritingsDataByDateDesc = (
  mdxData: GetWritingsQuery['writings'] | undefined,
) => {
  if (!Array.isArray(mdxData)) return [];

  return [...mdxData].sort(({ datePublished: a }, { datePublished: b }) =>
    compareDesc(new Date(a as string), new Date(b as string)),
  );
};

type Writings = (GetWritingsQuery['writings'][0] & { year: string })[];
export const groupDatesByYear = (writings: Writings) => {
  return Object.entries(
    writings.reduce((result, value) => {
      if (result[value.year] === undefined) {
        result[value.year] = [];
      }

      result[value.year]?.push(value);

      return result;
    }, {} as Record<string, Writings>),
  )
    .map(([key, value]) => ({
      year: key,
      writings: value,
    }))
    .reverse();
};

export const addYearToWritings = (writings: GetWritingsQuery['writings']) => {
  return writings.map((writing) => {
    return {
      ...writing,
      year: getYearFromDate(writing.datePublished as string),
    };
  });
};
