import { useCallback, useMemo } from 'react';
import Web3 from 'web3';
import { decimals } from '@/utils/calls/ERC20';
import { useERC20Token } from '@/hooks/useContract';

const useConvertPrice = () => {
  const token = useERC20Token();
  let web3 = new Web3();


  const handleConvertFromRaw = useCallback(
    async (amount: string) => {
      const dec = await decimals(token);
      return parseFloat(web3.utils.toBN(amount).div(web3.utils.toBN(10).pow(web3.utils.toBN(dec))).toString()).toFixed(2);
    },
    [token],
  );

  const handleConvertToRaw = useCallback(
    async (amount: string) => {        
      //const dec = await decimals(token);
      //return web3.utils.toBN(amount).mul(web3.utils.toBN(10).pow(web3.utils.toBN(dec))).toString()
      return web3.utils.toWei(amount, 'ether');
    },
    [token],
  );

  return { toFixed: handleConvertFromRaw, toRaw: handleConvertToRaw };
};

export default useConvertPrice;