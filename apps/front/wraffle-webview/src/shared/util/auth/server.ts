'use server';

import {ACCESS_TOKEN_EXPIRES_IN} from '../const';
import {auth, signIn, signOut} from './auth';
import type {z} from 'zod';
import type {JWT} from 'next-auth/jwt';
import {API_BASE_URL} from '@/shared/api/apiClient';
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
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      body: JSON.stringify({refreshToken: token.refreshToken}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.accessToken}`,
        credentials: 'include',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

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
