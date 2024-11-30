import apiClient from '../api/apiClient';
import {ACCESS_TOKEN_EXPIRES_IN} from './const';
import NextAuth from 'next-auth';
import type {JWT} from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import {loginSchema} from '@/widgets/login/config';

export const {handlers, signIn, signOut, auth} = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'},
      },
      authorize: async credentials => {
        const {email, password} = await loginSchema.parseAsync(credentials);

        const response = await apiClient.post<
          {accessToken: string; refreshToken: string},
          {email: string; password: string}
        >('/auth/login', {
          body: {email, password},
          withAuth: true,
        });

        if ('data' in response) {
          return response.data;
        } else {
          console.error('Error', response.message);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({session, token}) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});

async function refreshAccessToken(token: JWT) {
  const response = await apiClient.post<
    {accessToken: string},
    {refreshToken: string}
  >('/auth/refresh', {withAuth: true});

  if ('data' in response) {
    return {
      ...token,
      accessToken: response.data.accessToken,
      accessTokenExpires: Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000,
    };
  } else {
    return {...token, error: 'RefreshAccessTokenError'};
  }
}
