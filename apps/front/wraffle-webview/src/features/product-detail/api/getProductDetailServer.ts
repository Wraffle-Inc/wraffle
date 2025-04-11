'use server';

import type {RaffleData, EventData} from '@/entities/product/product';
import apiClient from '@/shared/api/apiClient';
import {getSession} from '@/shared/util/auth/server';

interface Props {
  id: number;
  type: 'raffle' | 'event';
}

export const getProductDetailServer = async ({id, type}: Props) => {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error('Unauthorized: no access token');
  }

  if (type === 'raffle') {
    const res = await apiClient.get<RaffleData>(`/raffles/${id}`, {
      withAuth: true,
    });
    return res.data;
  }

  if (type === 'event') {
    const res = await apiClient.get<EventData>(`/events/${id}`, {
      withAuth: true,
    });
    return res.data;
  }

  throw new Error('Invalid product type');
};
