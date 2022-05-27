import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
// import { simpleRpcProvider } from 'utils/providers';
// eslint-disable-next-line import/no-unresolved
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { useEffect, useRef, useState } from 'react';

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setprovider] = useState(library);

  useEffect(() => {
    if (library !== refEth.current) {
      setprovider(library);
      refEth.current = library;
    }
  }, [library]);

  return {
    library: provider,
    chainId,
    ...web3React,
  };
};

export default useActiveWeb3React;
