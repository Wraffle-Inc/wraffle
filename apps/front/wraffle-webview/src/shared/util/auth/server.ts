'use server';

import {auth, signIn} from './auth';
import type {z} from 'zod';
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

export {auth as getSession};
