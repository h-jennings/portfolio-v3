import fs from 'fs';
import path from 'path';
import { PATHS } from './paths.constants';

export const WRITINGS_PATH = path.join(process.cwd(), PATHS.writings);

export const DATA_PATH = path.join(process.cwd(), PATHS.data);

// writingsFilePaths is the list of all mdx files inside the WRITINGS_PATH directory
export const writingsFilePaths = fs
  .readdirSync(WRITINGS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const nowFilePath = `${DATA_PATH}now.mdx`;
