import apiClient from '../../api/apiClient';
import type {Tokens} from '../../api/type';
import {isApiResponseError} from '../../api/type';
import {ACCESS_TOKEN_EXPIRES_IN} from '../const';
import NextAuth, {CredentialsSignin} from 'next-auth';
import type {JWT} from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import {loginSchema} from '@/widgets/login/config';

interface LoginRequestBody {
  email: string;
  password: string;
}

export const {handlers, signIn, signOut, auth} = NextAuth({
  trustHost: true,
  pages: {
    signIn: '/login/email',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'},
      },
      authorize: async credentials => {
        const validationFields = await loginSchema.safeParseAsync(credentials);
        if (!validationFields.success) return null;

        const {email, password} = validationFields.data;

        try {
          const response = await apiClient.post<Tokens, LoginRequestBody>(
            '/auth/login',
            {
              body: {email, password},
            },
          );

          return response.data;
        } catch (error) {
          const credentialsSignin = new CredentialsSignin();
          if (isApiResponseError(error) && error.status === 401) {
            credentialsSignin.code = error.code;
            credentialsSignin.message = error.message;
          }
          throw credentialsSignin;
        }
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
  try {
    const response = await apiClient.post<
      {accessToken: string},
      {refreshToken: string}
    >('/auth/refresh', {
      body: {refreshToken: token.refreshToken},
      withAuth: true,
    });
    return {
      ...token,
      accessToken: response.data.accessToken,
      accessTokenExpires: Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000,
    };
  } catch (error) {
    signOut();
    return {...token, error: 'RefreshAccessTokenError'};
  }
}
