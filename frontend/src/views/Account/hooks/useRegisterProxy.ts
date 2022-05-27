import { useCallback } from 'react';

import { useWyvernRegistry } from '@/hooks/useContract';
import { registerProxy } from '@/utils/calls';

const useRegisterProxy = () => {
  const registry = useWyvernRegistry();

  const handleRegister = useCallback(async () => {
    // @ts-ignore
    const txHash = await registerProxy(registry);
    console.info(txHash);
  }, [registry]);

  return { registerProxy: handleRegister };
};

export default useRegisterProxy;
