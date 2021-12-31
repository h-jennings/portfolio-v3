import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import {
  DATA_PATH,
  nowFilePath,
  writingsFilePaths,
  WRITINGS_PATH,
} from '../constants/mdx.constants';
import {
  FrontMatterPreParse,
  FrontMatterZodPreParse,
  MdxData,
  MdxMetaData,
} from '../types/mdx-data';
import { getYearFromDate, parseDateToString } from './date.helpers';

const getMdxMetadata = (
  content: string,
  frontMatter: FrontMatterPreParse,
): MdxMetaData => {
  // Will throw an error if data doesn't match
  const data = FrontMatterZodPreParse.parse(frontMatter);
  return {
    ...data,
    publishDate: parseDateToString(data?.publishDate),
    readingTimeResults: readingTime(content),
    year: getYearFromDate(parseDateToString(data.publishDate)),
  };
};

const getFileSource = (p1: string, p2: string): Buffer => {
  const filePath = path.join(p1, p2);
  return fs?.readFileSync(filePath);
};

export function getWritingDataFromSlug(slug: string): MdxData {
  // rebuilding filename from 'slug' which is passed as a link param
  // (which was created in the `getStaticPaths` method)
  const fileName = `${slug}.mdx`;

  const { content, data } = matter(getFileSource(WRITINGS_PATH, fileName));

  return {
    content,
    fileName,
    metaData: getMdxMetadata(content, data as FrontMatterPreParse),
  };
}

export const getAllWritingsData = (): MdxData[] => {
  const writings: MdxData[] = writingsFilePaths.map((fileName) => {
    const { content, data } = matter(getFileSource(WRITINGS_PATH, fileName));

    return {
      content,
      fileName,
      metaData: getMdxMetadata(content, data as FrontMatterPreParse),
    };
  });

  return writings;
};

export const getNowPageData = (): MdxData => {
  const nowFileSource = fs?.readFileSync(`${DATA_PATH}now.mdx`);
  const { content, data } = matter(nowFileSource);

  return {
    content,
    fileName: nowFilePath,
    metaData: getMdxMetadata(content, data as FrontMatterPreParse),
  };
};
