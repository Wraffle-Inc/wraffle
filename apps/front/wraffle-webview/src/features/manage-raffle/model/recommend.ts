import type {Raffle, RaffleType} from '@/entities/raffle';

export interface RecommendRaffle extends Raffle {
  type: RaffleType;
  isBookmarked: boolean;
}
