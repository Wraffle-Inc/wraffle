import {useMutation} from '@tanstack/react-query';

const PASSWORD_API_PREFIX = 'http://localhost:8000/v1/auth/reset-password';

interface PasswordResetRequest {
  code: string;
  email: string;
  resetPassword: string;
}

/**
 * 비밀번호 재설정
 */
export const POST_PASSWORD_RESET_PATH = `${PASSWORD_API_PREFIX}`;
export const useResetPassword = () => {
  const mutation = useMutation({
    mutationFn: async (query: PasswordResetRequest) => {
      const response = await fetch(POST_PASSWORD_RESET_PATH, {
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

  const requestResetPassword = (
    query: PasswordResetRequest,
    {
      onSuccess,
      onError,
    }: {onSuccess: () => void; onError: (error: Error) => void},
  ) => {
    return mutation.mutate(query, {onSuccess, onError});
  };

  return requestResetPassword;
};

/**
 * 비밀번호 재설정 이메일 요청
 */
export const POST_PASSWORD_SEND_EMAIL_PATH = `${PASSWORD_API_PREFIX}/send-email`;
export const useSendEmail = () => {
  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch(POST_PASSWORD_SEND_EMAIL_PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(data.message);
      }
    },
  });

  const requestSendEmail = (
    query: string,
    {
      onSuccess,
      onError,
    }: {onSuccess: () => void; onError: (error: Error) => void},
  ) => {
    return mutation.mutate(query, {onSuccess, onError});
  };

  return requestSendEmail;
};
