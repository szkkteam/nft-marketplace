// @ts-nocheck
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { useEffect, useState } from 'react';

import { getAccount } from '@/utils/api';

const useHasAccount = () => {
  const { account } = useWeb3React<Web3ReactProvider>();
  const [proxyAccount, setProxyAccount] = useState<Object | null>(null);
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
