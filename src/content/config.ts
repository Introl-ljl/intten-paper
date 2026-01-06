import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const thoughtsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
  }),
});

export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
  thoughts: thoughtsCollection,
};
