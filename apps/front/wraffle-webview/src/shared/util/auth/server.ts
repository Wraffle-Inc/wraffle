'use server';

import {ACCESS_TOKEN_EXPIRES_IN} from '../const';
import {auth, signIn, signOut} from './auth';
import type {z} from 'zod';
import type {JWT} from 'next-auth/jwt';
import apiClient from '@/shared/api/apiClient';
import type {loginSchema} from '@/widgets/login/config';

export const signInWithCredentials = async (
  data: z.infer<typeof loginSchema>,
) => {
  await signIn('credentials', {
    email: data.email,
    password: data.password,
    redirectTo: '/',
  });
};

export const signOutWithCredentials = async () => {
  await signOut();
};

export {auth as getSession};

export const reissueToken = async (token: JWT) => {
  try {
    const {data} = await apiClient.post<
      {accessToken: string},
      {refreshToken: string}
    >('/auth/refresh', {
      body: {refreshToken: token.refreshToken},
    });

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000,
    };
  } catch (error) {
    await signOutWithCredentials();
    return {...token, error};
  }
};
