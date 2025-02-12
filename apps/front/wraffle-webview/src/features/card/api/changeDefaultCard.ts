import apiClient from '@/shared/api/apiClient';
import {useMutation} from '@tanstack/react-query';

export const changeDefaultCardAPI = async (cardId: number) => {
  await apiClient.patch(`/users/me/cards/${cardId}`, {withAuth: true});
};

export const usePATCHDefaultCardQuery = () => {
  const mutation = useMutation({
    mutationFn: changeDefaultCardAPI,
  });

  return {changeDefaultCard: mutation.mutate};
};
