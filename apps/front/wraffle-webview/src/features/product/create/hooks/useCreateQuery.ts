import type {
  EventPayload,
  Payload,
  ProductResponse,
  RafflePayload,
} from '../config/type';
import apiClient from '@/shared/api/apiClient';
import {useMutation} from '@tanstack/react-query';

export const createProduct = async (payload: Payload) => {
  const {type, ...data} = payload;
  const url = type === 'raffle' ? '/raffles' : '/events';

  const response = await apiClient.post<
    ProductResponse,
    RafflePayload | EventPayload
  >(url, {body: data, withAuth: true});
  return response.data;
};

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: (data: Payload) => createProduct(data),
  });
};
