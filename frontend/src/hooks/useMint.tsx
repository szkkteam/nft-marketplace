import { useCallback } from 'react';
import { mint } from '@/utils/calls/mintable';
import { useMintable } from '@/hooks/useContract';
import Web3 from 'web3';

const useMint = (address: string) => {
  const contract = useMintable(address);
  let web3 = new Web3();

  const handleMint = useCallback(
    async (amount: string) => {
      const price = 0.08;
      const value = web3.utils.toWei((parseInt(amount) * price).toString(), 'ether');

      return await mint(contract, amount, { value });
    },
    [contract],
  );

  return { 
      mint: handleMint,
    };
};

export default useMint;