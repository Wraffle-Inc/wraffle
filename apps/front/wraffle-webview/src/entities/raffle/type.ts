import type {RAFFLE_TYPE} from './const';
import type {TagType} from '@wraffle/ui';

export interface Raffle {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  clipCount: number;
  hashtags: TagType[];
}

export type RaffleType = (typeof RAFFLE_TYPE)[number];
