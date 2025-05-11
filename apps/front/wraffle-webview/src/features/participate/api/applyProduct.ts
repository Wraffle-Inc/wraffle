'use server';

import apiClient from '@/shared/api/apiClient';
import {getSession} from '@/shared/util/auth/server';

interface ApplyToProductRequest {
  targetId: number;
  type: 'RAFFLE' | 'EVENT';
}

interface ApplyProductResponse {
  id: number;
  applyUid: string;
  applyStatus: 'WAITING' | 'COMPLETE' | 'APPROVED' | 'REJECTED';
}

export const applyProduct = async (
  data: ApplyToProductRequest,
): Promise<ApplyProductResponse> => {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error('Unauthorized');
  }

  const response = await apiClient.post<
    ApplyProductResponse,
    ApplyToProductRequest
  >('/applies', {
    withAuth: true,
    body: data,
  });

  return response.data;
};
