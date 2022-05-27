import { useCallback } from 'react';

import { useMintable } from '@/hooks/useContract';
import { mint } from '@/utils/calls/mintable';

const useMint = (address: string) => {
  const contract = useMintable(address);

  const handleMint = useCallback(
    async (amount: string) => {
      // const price = 0.08;
      // const value = web3.utils.toWei((parseInt(amount) * price).toString(), 'ether');
      // return await mint(contract, amount, { value });
      // @ts-ignore
      return mint(contract, amount, {});
    },
    [contract]
  );

  return {
    mint: handleMint,
  };
};

export default useMint;
