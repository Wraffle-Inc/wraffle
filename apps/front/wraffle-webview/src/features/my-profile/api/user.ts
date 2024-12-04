import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

const USER_API_PREFIX = 'https://wraffle-api.justsloth.com/v1/users/me';

/**
 * 내 정보 조회
 */
export const GET_USER_INFO_PATH = `${USER_API_PREFIX}`;
export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [GET_USER_INFO_PATH],
    queryFn: async () => {
      const response = await fetch(GET_USER_INFO_PATH, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      return response.json();
    },
  });
};

interface EditUserRequest {
  name: string;
  nickname: string;
  email: string;
  phoneNumber: string;
}

/**
 * 내 정보 수정
 */
export const PUT_USER_INFO_PATH = `${USER_API_PREFIX}`;
export const usePutUserInfo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (query: EditUserRequest) => {
      const response = await fetch(PUT_USER_INFO_PATH, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_USER_INFO_PATH],
      });
    },
  });

  const requestEditUserInfo = (
    query: EditUserRequest,
    {
      onSuccess,
      onError,
    }: {onSuccess: () => void; onError: (error: Error) => void},
  ) => {
    return mutation.mutate(query, {onSuccess, onError});
  };

  return requestEditUserInfo;
};
