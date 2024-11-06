import type {RaffleType} from '../contants';
import type {TagType} from '@wraffle/ui';

export interface RecommendRaffle {
  id: number;
  type: RaffleType;
  title: string;
  price: number;
  clipCount: number;
  hashtags: TagType[];
  thumbnail: string;
  isBookmarked: boolean;
}
