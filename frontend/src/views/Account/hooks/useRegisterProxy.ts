import { useCallback } from 'react';
import { registerProxy } from '@/utils/calls';
import { useWyvernRegistry } from '@/hooks/useContract';

const useRegisterProxy = () => {
  const registry = useWyvernRegistry();

  const handleRegister = useCallback(
    async () => {
      const txHash = await registerProxy(registry);
      console.info(txHash);
    },
    [registry],
  );

  return { registerProxy: handleRegister };
};

export default useRegisterProxy;