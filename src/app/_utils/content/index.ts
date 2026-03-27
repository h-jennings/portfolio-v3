import { format } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

export interface Writing {
  slug: string;
  title: string;
  description: string;
  date: string;
  featured: boolean;
  status: 'draft' | 'published';
  readingTime: string;
}

export interface Update {
  slug: string;
  date: string;
}

const writingsDir = path.join(process.cwd(), 'src/data/writings');
const updatesDir = path.join(process.cwd(), 'src/data/updates');

function toDateString(val: unknown): string {
  if (val instanceof Date) return format(val, 'yyyy-MM-dd');
  return String(val);
}

export function getAllWritings(): Writing[] {
  return fs
    .readdirSync(writingsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(writingsDir, filename), 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: toDateString(data.date),
        featured: data.featured as boolean,
        status: data.status as 'draft' | 'published',
        readingTime: readingTime(content, { wordsPerMinute: 275 }).text,
      };
    });
}

export function getAllUpdates(): Update[] {
  return fs
    .readdirSync(updatesDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(updatesDir, filename), 'utf-8');
      const { data } = matter(raw);
      return {
        slug,
        date: toDateString(data.date),
      };
    });
}
