import {z} from 'zod';
import {getDefaults} from '@/shared/util';

const titleSchema = z.string().default('');
const categoryIdSchema = z.string().default('');
const tagIdsSchema = z.number().array().default([]);
const priceSchema = z.string().default('');

const startDateSchema = z.date();
const endDateSchema = z.date();
const announceAtSchema = z.date();
const winnerCountSchema = z.string().default('');

const productsSchema = z.object({
  title: z.string(),
  tagIds: z.number().array().default([]),
  imageUrl: z.string(),
});
const productsArraySchema = z.array(productsSchema).default([]);

const imagesSchema = z.string().array().default([]);

const etcSchema = z.string().default('');

export const createEventSchema = z.object({
  title: titleSchema,
  categoryId: categoryIdSchema,
  tagIds: tagIdsSchema,
  price: priceSchema,
  startDate: startDateSchema,
  endDate: endDateSchema,
  announceAt: announceAtSchema,
  winnerCount: winnerCountSchema,
  products: productsArraySchema,
  images: imagesSchema,
  etc: etcSchema,
});

export type CreateEventPayload = z.infer<typeof createEventSchema>;

export const createEventDefaultValues = getDefaults(createEventSchema);
