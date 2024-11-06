export const RAFFLE_TYPE = ['RAFFLE', 'EVENT'] as const;

export type RaffleType = (typeof RAFFLE_TYPE)[number];
