import type {GetUserInfoResponse} from '@/entities/settlement/type';
import apiClient from '@/shared/api/apiClient';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

interface MutationCallbacks {
  onSuccess: () => void;
  onError: (error: Error) => void;
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

interface PatchUserInfoRequest {
  nickname: string;
  email: string;
  phoneNumber: string;
}

/**
 * 내 정보 수정
 */
export const usePatchUserInfo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body: PatchUserInfoRequest) => {
      await apiClient.patch('/users/me', {
        body,
        withAuth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_USER_INFO_PATH],
      });
    },
  });

  const requestEditUserInfo = (
    query: PatchUserInfoRequest,
    {onSuccess, onError}: MutationCallbacks,
  ) => {
    return mutation.mutate(query, {onSuccess, onError});
  };

  return requestEditUserInfo;
};

interface PutSettlementAccountRequest {
  bankName: string;
  bankAccount: string;
}

/**
 * 내 정산계좌 등록/수정
 */
export const usePutSettlementAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body: PutSettlementAccountRequest) => {
      await apiClient.put('/users/me/settlement-account', {
        body,
        withAuth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [GET_USER_INFO_PATH]});
    },
  });

  const requestPutSettlementAccount = (
    body: PutSettlementAccountRequest,
    {onSuccess, onError}: MutationCallbacks,
  ) => {
    return mutation.mutate(body, {onSuccess, onError});
  };

  return requestPutSettlementAccount;
};
