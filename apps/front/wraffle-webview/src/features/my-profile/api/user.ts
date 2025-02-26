import apiClient from '@/shared/api/apiClient';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

const USER_API_PREFIX = '/users/me';

interface GetUserInfoResponse {
  id: number;
  createdAt: Date;
  email: string;
  nickname: string;
  phoneNumber: string;
  isAgreed: boolean;
  isPrivacyAgreed: boolean;
  isThirdAgreed: boolean;
  isMarketingAgreed: boolean;
  settlementBankName?: string;
  settlementBankAccount?: string;
  availableSettlementPrice: number;
}

/**
 * 내 정보 조회
 */
export const GET_USER_INFO_PATH = '/users/me';
export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [GET_USER_INFO_PATH],
    queryFn: async () => {
      const response = await apiClient.get<GetUserInfoResponse>(
        GET_USER_INFO_PATH,
        {
          withAuth: true,
        },
      );

      return response.data;
    },
  });
};

interface EditUserRequest {
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
