import { format } from 'date-fns';
import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';
import readingTime from 'reading-time';
import { z } from 'zod';

export interface Writing {
  slug: string;
  title: string;
  description: string;
  date: string;
  featured: boolean;
  status: 'draft' | 'published';
  readingTime: string;
}

const writingsDir = path.join(process.cwd(), 'src/data/writings');

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

export interface Update {
  slug: string;
  date: string;
}

const updatesDir = path.join(process.cwd(), 'src/data/updates');

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

const projectMediaSchema = z.object({
  url: z.string(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  alt: z.string(),
  mediaType: z.enum(['IMAGE', 'VIDEO']),
});

const projectFrontmatterSchema = z.object({
  name: z.string(),
  client: z.string().nullable().default(null),
  category: z.array(z.string()),
  featured: z.boolean(),
  date: z.array(z.unknown()).transform((dates) => dates.map(toDateString)),
  link: z.string().nullable().default(null),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().nullable().default(null),
  }),
  featuredMediaNarrow: projectMediaSchema,
  featuredMediaWide: projectMediaSchema,
  media: z.array(projectMediaSchema),
  description: z.string(),
});

export type ProjectMedia = z.infer<typeof projectMediaSchema>;
export type Project = { slug: string } & z.infer<
  typeof projectFrontmatterSchema
>;

const projectsDir = path.join(process.cwd(), 'src/data/projects');

export function getAllProjects(limit?: number): Array<Project> {
  const projects = fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(projectsDir, filename), 'utf-8');
      const { data } = matter(raw);
      const parsed = projectFrontmatterSchema.parse(data);
      return { slug, ...parsed };
    })
    .sort((a, b) => (b.date[0] ?? '').localeCompare(a.date[0] ?? ''));

  return limit != null ? projects.slice(0, limit) : projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
