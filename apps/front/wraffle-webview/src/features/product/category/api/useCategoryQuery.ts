import type {CategoryItem} from '@/entities/category/type';
import apiClient from '@/shared/api/apiClient';
import {useQuery} from '@tanstack/react-query';

const fetchCategories = async () => {
  const response = await apiClient.get<{items: CategoryItem[]}>('/categories', {
    withAuth: true,
  });

  return response.data;
};

export const useCategoryQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  });
