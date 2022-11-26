import { useLocalStorage } from '@seno/api-react';

export default function useEnableDataLayerService() {
  return useLocalStorage<boolean>('enableDataLayerService', false);
}
