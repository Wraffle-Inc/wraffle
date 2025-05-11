import type {
  EventPayload,
  Payload,
  ProductResponse,
  RafflePayload,
} from '../config/type';
import apiClient from '@/shared/api/apiClient';

export const createProduct = async (payload: Payload) => {
  const {type, ...data} = payload;
  const url = type === 'raffle' ? '/raffles' : '/events';

  return await apiClient.post<ProductResponse, RafflePayload | EventPayload>(
    url,
    {body: data, withAuth: true},
  );
};
