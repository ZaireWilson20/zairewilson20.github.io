import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Posts are named YYYY-MM-DD-slug.md (same as Jekyll's _posts), which sets the date and URL.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
