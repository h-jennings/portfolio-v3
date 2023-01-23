import { Writing } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';

export const getYearFromDate = (date: string): string => {
  return new Date(date).getFullYear().toString();
};
export const parseDateToString = (date: string): string => {
  return format(parseISO(date), 'yyyy-MM-dd');
};
export const parseDateToLongDateString = (date: string): string => {
  return format(parseISO(date), 'LLLL dd, yyyy ');
};

export const sortWritingsDataByDateDesc = (writings: Writing[]) => {
  if (!Array.isArray(writings)) return [];

  return [...writings].sort(({ date: a }, { date: b }) =>
    compareDesc(new Date(a), new Date(b)),
  );
};

type Writings = (Writing & { year: string })[];
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

export const addYearToWritings = (writings: Writing[]) => {
  return writings.map((writing) => {
    return {
      ...writing,
      year: getYearFromDate(writing.date),
    };
  });
};
