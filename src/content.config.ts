import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('traderskeptical'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    category: z.string().optional(),
    dek: z.string().optional(),
  }),
});

export const collections = { articles };
