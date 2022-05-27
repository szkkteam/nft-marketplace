import Web3 from 'web3';
// import { useERC20Token } from '@/hooks/useContract';

const useConvertPrice = () => {
  // const token = useERC20Token();
  const web3 = new Web3();

  const handleConvertFromRaw = (amount: string) => {
    // const dec = await decimals(token);
    // if (amount === undefined || amount === null || dec === undefined || dec === null) { return null; }
    // return parseFloat(web3.utils.toBN(amount).div(web3.utils.toBN(10).pow(web3.utils.toBN(dec))).toString()).toFixed(2);
    return parseFloat(web3.utils.fromWei(amount, 'ether')).toFixed(2);
  };

  const handleConvertToRaw = (amount: string) => {
    // const dec = await decimals(token);
    // return web3.utils.toBN(amount).mul(web3.utils.toBN(10).pow(web3.utils.toBN(dec))).toString()
    return web3.utils.toWei(amount, 'ether');
  };

  /*
  const handleConvertFromRaw = useCallback(
    async (amount: string) => {
      //const dec = await decimals(token);
      //if (amount === undefined || amount === null || dec === undefined || dec === null) { return null; }
      //return parseFloat(web3.utils.toBN(amount).div(web3.utils.toBN(10).pow(web3.utils.toBN(dec))).toString()).toFixed(2);
      return parseFloat(web3.utils.fromWei(amount, 'ether')).toFixed(2);

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
  */

  return { toFixed: handleConvertFromRaw, toRaw: handleConvertToRaw };
};

export default useConvertPrice;
