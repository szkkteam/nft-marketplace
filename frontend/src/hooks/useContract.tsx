import { useMemo } from 'react';
import useActiveWeb3React from '@/hooks/useActiveWeb3React';

import { getWyvernRegistryContract } from '@/utils/contractHelpers';

export const useWyvernRegistry = () => {
  const { library } = useActiveWeb3React();
  return useMemo(() => library && getWyvernRegistryContract(library.getSigner()), [library]);
};