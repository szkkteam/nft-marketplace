import { useCallback } from 'react';

import { useWyvernRegistry } from '@/hooks/useContract';
import { proxies } from '@/utils/calls';

const useProxies = () => {
  const registry = useWyvernRegistry();

  const handleProxies = useCallback(
    async (address: string | null | undefined) => {
      // @ts-ignore
      return proxies(registry, address);
    },
    [registry]
  );

  return { proxies: handleProxies };
};

export default useProxies;
