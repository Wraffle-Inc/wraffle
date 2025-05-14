import type {CategoryItem} from '../model/type';
import apiClient from '@/shared/api/apiClient';
import {getSession} from '@/shared/util/auth/server';

interface GetCategoriesResponse {
  items: CategoryItem[];
}

export const getCategories = async (): Promise<CategoryItem[]> => {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error('Unauthorized');
  }

  const res = await apiClient.get<GetCategoriesResponse>('/categories', {
    withAuth: true,
  });

  return res.data.items;
};
