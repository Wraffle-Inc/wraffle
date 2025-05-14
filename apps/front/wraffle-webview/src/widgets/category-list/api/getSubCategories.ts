'use server';

import type {CategoryItem} from '@/entities/category';
import apiClient from '@/shared/api/apiClient';
import {getSession} from '@/shared/util/auth/server';

interface GetSubCategoryResponse {
  items: CategoryItem[];
}

export const getSubCategories = async (
  parentId?: number,
): Promise<CategoryItem[]> => {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error('Unauthorized');
  }

  const res = await apiClient.get<GetSubCategoryResponse>('/categories/sub', {
    withAuth: true,
    params: {parentId},
  });

  return res.data.items;
};
