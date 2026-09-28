import { parse } from 'yaml';
import { getCollection, type CollectionEntry } from 'astro:content';
import siteRaw from '../data/site.yml?raw';
import projectsRaw from '../data/projects.yml?raw';
import nowRaw from '../data/now.yml?raw';
import experienceRaw from '../data/experience.yml?raw';

export const site = parse(siteRaw);
export const projects: any[] = parse(projectsRaw).map((p: any) => p.project);
export const now: any[] = parse(nowRaw);
export const experience = parse(experienceRaw);

/** Prefix root-relative links with the configured base path. */
export const url = (path: string) =>
  /^[a-z]+:/i.test(path) ? path : `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`;

// ---- Blog posts ----
export type Post = CollectionEntry<'blog'> & { date: Date; slug: string; href: string };

/** Posts named YYYY-MM-DD-slug, newest first. URL matches Jekyll: /YYYY/MM/DD/slug.html */
export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection('blog', ({ data }) => !data.draft);
  return entries
    .map((e) => {
      const m = e.id.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
      if (!m) throw new Error(`Post "${e.id}" must be named YYYY-MM-DD-slug.md`);
      const [, y, mo, d, name] = m;
      const slug = `${y}/${mo}/${d}/${name}`;
      return { ...e, date: new Date(`${y}-${mo}-${d}T12:00:00Z`), slug, href: url(`/${slug}.html`) };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

/** tag -> posts, in first-seen order (like Jekyll's site.tags) */
export async function getTags(): Promise<Map<string, Post[]>> {
  const tags = new Map<string, Post[]>();
  for (const post of await getPosts()) {
    for (const tag of post.data.tags) {
      if (!tags.has(tag)) tags.set(tag, []);
      tags.get(tag)!.push(post);
    }
  }
  return tags;
}

export const tagSlug = (tag: string) => tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/** First ~25 words of the post body as plain text. */
export function excerpt(body = '', words = 25) {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_>`\\]/g, ' ')
    .split(/\n\s*\n/)[0]
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');
  return words < text.length ? text.slice(0, words).join(' ') + '...' : text.join(' ');
}
