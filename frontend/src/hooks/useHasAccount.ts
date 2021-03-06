import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

// @ts-ignore
import { AccountEntity } from '@/interfaces/asset';
import { getAccount } from '@/utils/api';

const useHasAccount = () => {
  // @ts-ignore
  const { account } = useWeb3React<Web3ReactProvider>();
  const [proxyAccount, setProxyAccount] = useState<AccountEntity | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    account &&
      (async () => {
        try {
          const _proxyAccount = await getAccount(account);
          console.log(_proxyAccount);
          // @ts-ignore
          setProxyAccount(_proxyAccount);
        } catch (err) {
        } finally {
          setIsLoading(false);
        }
      })();
  }, [account]);

  return { proxyAccount, isLoading };
};

export default useHasAccount;
