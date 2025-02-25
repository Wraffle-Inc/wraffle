import {getCardListQueryOptions} from '../config';
import type {Card} from '@/entities/card';
import apiClient from '@/shared/api/apiClient';
import {isApiResponseError} from '@/shared/api/type';
import {useSuspenseQuery} from '@tanstack/react-query';

export interface GetCardListResponse {
  items: Card[];
}

export const getCardListAPI = async () => {
  try {
    const response = await apiClient.get<GetCardListResponse>(
      '/users/me/cards',
      {
        withAuth: true,
      },
    );

    return response.data;
  } catch (error) {
    if (isApiResponseError(error) && error.status === 404) {
      return {
        items: [],
      };
    }
    throw error;
  }
};

export const GET_CARD_LIST_KEY = () => ['GET_CARD_LIST'];

export const useGETCardListQuery = () => {
  return useSuspenseQuery({
    ...getCardListQueryOptions(),
    select: data => data.items,
  });
};
