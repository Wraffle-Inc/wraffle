'use client';

import {type AppBridge} from '../../app/module/app-bridge';
import {createLinkBridgeProvider} from '@webview-bridge/react';

export const {
  BridgeProvider,
  useBridgeStore,
  useBridgeStatus,
  useBridgeLoose,
  useBridgeEventListener,
} = createLinkBridgeProvider<AppBridge>({
  throwOnError: true,
  initialBridge: {
    tokens: null,
  },
  onReady: () => {
    console.log('bridge is ready');
  },
});
