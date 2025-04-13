'use server';

import apiClient from '@/shared/api/apiClient';
import {getSession} from '@/shared/util/auth/server';

interface CreateClippingRequest {
  targetId: number;
  type: 'RAFFLE' | 'EVENT';
}

interface CreateClippingResponse {
  id: number;
}

export const createClipping = async (
  data: CreateClippingRequest,
): Promise<{data: CreateClippingResponse}> => {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error('Unauthorized');
  }

  const response = await apiClient.post<
    CreateClippingResponse,
    CreateClippingRequest
  >('/clippings', {
    withAuth: true,
    body: data,
  });

  return response;
};
