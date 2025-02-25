import apiClient from '@/shared/api/apiClient';
import {useMutation} from '@tanstack/react-query';

export const patchDefaultCardAPI = async (cardId: number) => {
  await apiClient.patch(`/users/me/cards/${cardId}`, {withAuth: true});
};

export const usePATCHDefaultCardQuery = () => {
  const mutation = useMutation({
    mutationFn: patchDefaultCardAPI,
  });

  return {patchDefaultCard: mutation.mutate};
};
