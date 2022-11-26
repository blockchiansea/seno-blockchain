import { useLocalStorage } from '@seno/api-react';

export default function useHideObjectionableContent() {
  return useLocalStorage<boolean>('hideObjectionableContent', true);
}
