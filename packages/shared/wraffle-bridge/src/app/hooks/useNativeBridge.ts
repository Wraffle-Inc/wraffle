import {appBridge} from '../module/app-bridge';
import {createWebView, useBridge} from '@webview-bridge/react-native';

export const useNativeBridge = () => {
  return useBridge(appBridge);
};

export const {WebView} = createWebView({
  bridge: appBridge,
  debug: true, // Enable console.log visibility in the native WebView
});
