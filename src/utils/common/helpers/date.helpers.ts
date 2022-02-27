import { compareDesc, format, parseISO } from 'date-fns';
import { MdxData } from '../types/mdx-data';

export const getYearFromDate = (date: string): string => {
  return new Date(date).getFullYear().toString();
};
export const parseDateToString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};
export const parseDateToLongDateString = (date: string): string => {
  return format(parseISO(date), 'LLLL dd, yyyy ');
};

/**
 * sorts dates in Desc order
 */
export function sortMdxDataByDateDesc(mdxData: MdxData[]): MdxData[] {
  if (!Array.isArray(mdxData)) return [];

  return [...mdxData].sort(({ metaData: a }, { metaData: b }) =>
    compareDesc(new Date(a.publishDate), new Date(b.publishDate)),
  );
}

export function groupDatesByYear(mdxData: MdxData[]) {
  return Object.entries(
    mdxData.reduce((result, value) => {
      if (result[value.metaData.year] === undefined) {
        result[value.metaData.year] = [];
      }
      result[value.metaData.year].push(value);
      return result;
    }, {} as { [x: string]: MdxData[] }),
  )
    .map(([key, value]) => ({
      year: key,
      writings: value,
    }))
    .reverse();
}
