import {useMutation} from '@tanstack/react-query';

const PHONE_AUTH_API_PREFIX = 'https://wraffle-api.justsloth.com/v1/phone-auth';

interface VerificationCodeSendRequest {
  phoneNumber: string;
}

export const POST_VERIFICATION_CODE_PATH = `${PHONE_AUTH_API_PREFIX}/request`;
export const useSendVerificationCode = () => {
  const mutation = useMutation({
    mutationFn: async (query: VerificationCodeSendRequest) => {
      const response = await fetch(POST_VERIFICATION_CODE_PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
    },
  });

  const requestSendVerificationCode = (
    query: VerificationCodeSendRequest,
    {
      onSuccess,
      onError,
    }: {onSuccess: () => void; onError: (error: Error) => void},
  ) => {
    return mutation.mutate(query, {onSuccess, onError});
  };

  return requestSendVerificationCode;
};

interface VerificationCodeVerifyRequest {
  phoneNumber: string;
  code: string;
}

export const POST_VERIFICATION_CODE_VERIFY_PATH = `${PHONE_AUTH_API_PREFIX}/verify`;
export const useVerifyVerificationCode = () => {
  const mutation = useMutation({
    mutationFn: async (query: VerificationCodeVerifyRequest) => {
      const response = await fetch(POST_VERIFICATION_CODE_VERIFY_PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
    },
  });

  const requestVerifyVerificationCode = (
    query: VerificationCodeVerifyRequest,
    {
      onSuccess,
      onError,
    }: {onSuccess: () => void; onError: (error: Error) => void},
  ) => {
    return mutation.mutate(query, {onSuccess, onError});
  };

  return requestVerifyVerificationCode;
};
