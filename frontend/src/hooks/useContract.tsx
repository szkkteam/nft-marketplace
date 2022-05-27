import { useMemo } from 'react';

import useActiveWeb3React from '@/hooks/useActiveWeb3React';
import {
  getERC20TokenContract,
  getIERC721Contract,
  getMintableContract,
  getTestContract,
  getWyvernExchangeContract,
  getWyvernRegistryContract,
  getWyvernStaticMarketContract,
} from '@/utils/contractHelpers';

export const useWyvernRegistry = () => {
  const { library } = useActiveWeb3React();
  return useMemo(
    () => library && getWyvernRegistryContract(library.getSigner()),
    [library]
  );
};

export const useIERC721 = (address: string) => {
  const { library } = useActiveWeb3React();
  return useMemo(
    () => library && getIERC721Contract(address, library.getSigner()),
    [address, library]
  );
};

export const useWyvernStaticMarket = () => {
  const { library } = useActiveWeb3React();
  return useMemo(
    () => library && getWyvernStaticMarketContract(library.getSigner()),
    [library]
  );
};

export const useWyvernExchange = () => {
  const { library } = useActiveWeb3React();
  return useMemo(
    () => library && getWyvernExchangeContract(library.getSigner()),
    [library]
  );
};

export const useERC20Token = () => {
  const { library } = useActiveWeb3React();
  return useMemo(
    () => library && getERC20TokenContract(library.getSigner()),
    [library]
  );
};

export const useTestContract = () => {
  const { library } = useActiveWeb3React();
  return useMemo(
    () => library && getTestContract(library.getSigner()),
    [library]
  );
};

export const useMintable = (address: string) => {
  const { library } = useActiveWeb3React();
  return useMemo(
    () => library && getMintableContract(address, library.getSigner()),
    [address, library]
  );
};
