import { defineCollection, z } from 'astro:content';

const about = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    bannerText: z.string().optional(),
  }),
});

const program = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    bannerText: z.string().optional(),
  }),
});

const registration = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    bannerText: z.string().optional(),
  }),
});

const exhibitors = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    bannerText: z.string().optional(),
  }),
});

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    bannerText: z.string().optional(),
  }),
});

const travel = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    bannerText: z.string().optional(),
  }),
});

export const collections = {
  about,
  program,
  registration,
  exhibitors,
  authors,
  travel,
};
