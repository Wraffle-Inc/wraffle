import {
  GET_CARD_LIST_KEY,
  getCardListAPI,
  type GetCardListResponse,
} from '../api';
import type {BasicSuspenseQueryOptions} from '@/shared/context/query/type';

export const getCardListQueryOptions =
  (): BasicSuspenseQueryOptions<GetCardListResponse> => ({
    queryKey: GET_CARD_LIST_KEY(),
    queryFn: getCardListAPI,
  });
