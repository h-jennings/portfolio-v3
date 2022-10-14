import { PATHS } from '@utils/common/constants/paths.constants';
import { getMdxMetadata } from '@utils/common/helpers/mdx-data.helpers';
import { FrontMatterPreParse } from '@utils/common/types/mdx-data';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const getFileSource = (p1: string, p2: string): Promise<Buffer> => {
  const filePath = path.join(p1, p2);
  return fs.readFile(filePath);
};

export const getWritings = async () => {
  const dir = path.resolve(process.cwd(), 'src');
  const WRITINGS_PATH = path.join(dir, PATHS.writings);

  const writingsFilePaths = await fs.readdir(WRITINGS_PATH).then((path) => {
    // Only include md(x) files
    return path.filter((path) => /\.mdx?$/.test(path));
  });

  const writings = await Promise.all(
    writingsFilePaths.map(async (fileName) => {
      const fileSource = await getFileSource(WRITINGS_PATH, fileName);
      const { content, data } = matter(fileSource);

      return {
        content,
        fileName,
        metaData: getMdxMetadata(content, data as FrontMatterPreParse),
      };
    }),
  );
  return writings;
};

const writings = async (_req: NextApiRequest, res: NextApiResponse) => {
  const writings = await getWritings();

  res.status(200).json(writings);
};

export default writings;
