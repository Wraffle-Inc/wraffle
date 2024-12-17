import {bridge} from '@webview-bridge/react-native';

type AppBridgeState = {
  tokens: {accessToken: string; refreshToken: string} | null;
  setBridgeWraffleTokens: (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => Promise<void>;
};

export const appBridge = bridge<AppBridgeState>(({set}) => ({
  tokens: null,
  setBridgeWraffleTokens: async tokens => {
    set({
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });
  },
}));

export type AppBridge = typeof appBridge;
