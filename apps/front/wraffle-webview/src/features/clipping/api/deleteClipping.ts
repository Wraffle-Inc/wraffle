'use server';

import apiClient from '@/shared/api/apiClient';
import {getSession} from '@/shared/util/auth/server';

interface DeleteClippingRequest {
  id: number;
  type: 'RAFFLE' | 'EVENT';
}

export const deleteClipping = async (
  data: DeleteClippingRequest,
): Promise<void> => {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error('Unauthorized');
  }

  await apiClient.delete<DeleteClippingRequest>(`/clippings`, {
    withAuth: true,
    body: data,
  });
};
