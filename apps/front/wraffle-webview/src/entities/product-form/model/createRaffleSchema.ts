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

const imagesSchema = z.string().array().default([]);

const etcSchema = z.string().default('');

export const createRaffleSchema = z.object({
  title: titleSchema,
  categoryId: categoryIdSchema,
  tagIds: tagIdsSchema,
  price: priceSchema,
  startDate: startDateSchema,
  endDate: endDateSchema,
  announceAt: announceAtSchema,
  winnerCount: winnerCountSchema,
  images: imagesSchema,
  etc: etcSchema,
});

export type CreateRafflePayload = z.infer<typeof createRaffleSchema>;

export const createRaffleDefaultValues = getDefaults(createRaffleSchema);
