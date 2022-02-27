import { z } from 'zod';

// Using zod here since we'll want to validate this data (no guarantees in mdx-land)
export const FrontMatterZodPreParse = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.date(),
  featured: z.boolean().optional(),
  image: z.string().optional(),
  status: z.union([z.literal('draft'), z.literal('published')]),
});

export type FrontMatterPreParse = z.infer<typeof FrontMatterZodPreParse>;
export type FrontMatterPostParse = Omit<FrontMatterPreParse, 'publishDate'> & {
  publishDate: string;
};

interface ReadingTimeResults {
  text: string;
  time: number;
  words: number;
  minutes: number;
}

export type MdxMetaData = FrontMatterPostParse & {
  readingTimeResults: ReadingTimeResults;
  year: string;
};

export interface MdxData {
  content: string;
  metaData: MdxMetaData;
  fileName: string;
}
