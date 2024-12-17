import {useBridgeStore} from '../providers/BridgeProvider';

export const useWebBridge = () => {
  return useBridgeStore(state => state);
};
