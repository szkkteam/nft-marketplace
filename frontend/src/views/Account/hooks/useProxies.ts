import { useCallback } from 'react';
import { proxies } from '@/utils/calls';
import { useWyvernRegistry } from '@/hooks/useContract';

const useProxies = () => {
  const registry = useWyvernRegistry();

  const handleProxies = useCallback(
    async (address: string | null | undefined) => {
      return await proxies(registry, address);
    },
    [registry],
  );

  return { proxies: handleProxies };
};

export default useProxies;