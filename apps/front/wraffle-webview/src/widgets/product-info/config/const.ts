export const RAFFLE_MENUS = [
  '상품',
  '응모 기간',
  '당첨자 발표',
  '유의사항',
] as const;
export const EVENT_MENUS = [
  '상품',
  '응모 기간',
  '당첨자 발표',
  '추첨 상품',
  '유의사항',
] as const;

export type RaffleMenu = (typeof RAFFLE_MENUS)[number];
export type EventMenu = (typeof EVENT_MENUS)[number];
