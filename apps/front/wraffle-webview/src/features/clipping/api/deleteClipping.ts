'use server';

import apiClient from '@/shared/api/apiClient';
import {getSession} from '@/shared/util/auth/server';

export const deleteClipping = async (clippingId: number): Promise<void> => {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error('Unauthorized');
  }

  await apiClient.delete<void>(`/clippings/${clippingId}`, {
    withAuth: true,
  });
};
