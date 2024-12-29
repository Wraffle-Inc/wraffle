'use server';

import type {JoinRequest} from '../config/type';
import apiClient from '@/shared/api/apiClient';
import type {Tokens} from '@/shared/api/type';

export const signUpUser = async (data: JoinRequest) => {
  await apiClient.post<Tokens, JoinRequest>('/auth/signup', {
    body: data,
  });
};
