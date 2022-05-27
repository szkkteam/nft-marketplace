// @ts-nocheck
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { useCallback } from 'react';

import { Account, createAccount } from '@/utils/api';

import useProxies from './useProxies';
import useRegisterProxy from './useRegisterProxy';

const useRegisterAccount = () => {
  const { account } = useWeb3React<Web3ReactProvider>();
  const { registerProxy } = useRegisterProxy();
  const { proxies } = useProxies();

  const handleRegister = useCallback(async () => {
    let proxyList = await proxies(account);
    console.log('Proxy account: ', proxyList);

    if (proxyList === '0x0000000000000000000000000000000000000000') {
      try {
        await registerProxy();
      } catch (e) {
        console.error(e);
      }
      proxyList = await proxies(account);
    }
    const payload: Account = {
      address: account,
      proxy: proxyList,
    };

    try {
      await createAccount(payload);
    } catch (e) {
      console.error(e);
    }
  }, [account, proxies, registerProxy]);

  return { register: handleRegister };
};

export default useRegisterAccount;
