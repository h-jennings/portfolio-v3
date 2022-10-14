import { PATHS } from '@utils/common/constants/paths.constants';
import { getMdxMetadata } from '@utils/common/helpers/mdx-data.helpers';
import { FrontMatterPreParse } from '@utils/common/types/mdx-data';
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const getFileSource = (p1: string, p2: string): Buffer => {
  const filePath = path.join(p1, p2);
  return readFileSync(filePath);
};

export const getWritings = () => {
  const dir = path.resolve(process.cwd(), 'src');
  const WRITINGS_PATH = path.join(dir, PATHS.writings);

  const writingsFilePaths = readdirSync(WRITINGS_PATH).filter((path) =>
    /\.mdx?$/.test(path),
  );

  const writings = writingsFilePaths.map((fileName) => {
    const fileSource = getFileSource(WRITINGS_PATH, fileName);
    const { content, data } = matter(fileSource);

    return {
      content,
      fileName,
      metaData: getMdxMetadata(content, data as FrontMatterPreParse),
    };
  });

  return writings;
};

const writings = (_req: NextApiRequest, res: NextApiResponse) => {
  const writings = getWritings();

  res.status(200).json(writings);
};

export default writings;
