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

        const response = await fetch(
          'https://wraffle-api.justsloth.com/v1/auth/login',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
          },
        );

        const user = await response.json();

        if (!response.ok) {
          throw new Error('Wrong username or password!');
        }

        if (response.ok && user) {
          return user.data;
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
  try {
    const response = await fetch(
      'https://wraffle-api.justsloth.com/v1/auth/refresh',
      {
        method: 'POST',
        body: JSON.stringify({refreshToken: token.refreshToken}),
        headers: {'Content-Type': 'application/json'},
      },
    );

    const newTokens = await response.json();

    if (!response.ok) throw newTokens;

    return {
      ...token,
      accessToken: newTokens.accessToken,
      accessTokenExpires: Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000,
      refreshToken: newTokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return {...token, error: 'RefreshAccessTokenError'};
  }
}
