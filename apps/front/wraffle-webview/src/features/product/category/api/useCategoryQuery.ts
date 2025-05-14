import type {CategoryItem} from '@/entities/category/model/type';
import apiClient from '@/shared/api/apiClient';
import {useQuery} from '@tanstack/react-query';

const fetchCategories = async () => {
  const response = await apiClient.get<{items: CategoryItem[]}>('/categories', {
    withAuth: true,
  });

  return response.data;
};

// TODO
// useSuspenseQuery로 개선
export const useCategoryQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  });
