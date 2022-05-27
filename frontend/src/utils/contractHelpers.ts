import { JsonRpcSigner } from '@ethersproject/providers';
import { ContractInterface, ethers } from 'ethers';

import ExchangeABI from '@/config/abi/Exchange.json';
// import IERC721ABI from '@/config/abi/IERC721.json';
import IERC721AABI from '@/config/abi/IERC721A.json';
import MintableABI from '@/config/abi/Mintable.json';
import StaticMarketABI from '@/config/abi/StaticMarket.json';
import TestABI from '@/config/abi/Test.json';
import ERC20TokenABI from '@/config/abi/Token.json';
import wyvernRegistryAbi from '@/config/abi/WyvernRegistry.json';

const getContract = (
  abi: ContractInterface,
  address: string,
  signer: JsonRpcSigner
) => {
  return new ethers.Contract(address, abi, signer);
};

export const getWyvernRegistryContract = (signer: ethers.Signer) => {
  return getContract(
    wyvernRegistryAbi,
    '0x7DeFE8E31dd520864C3b19aa664d05e81dD59D1b',
    // @ts-ignore
    signer
  );
};

export const getWyvernStaticMarketContract = (signer: ethers.Signer) => {
  return getContract(
    StaticMarketABI,
    '0xE4921a0c1d705601DB602dE3f1B728002Fa660B8',
    // @ts-ignore
    signer
  );
};

export const getWyvernExchangeContract = (signer: ethers.Signer) => {
  return getContract(
    ExchangeABI,
    '0xc2Bb92dfB1dbA4AE7E8e3413c10F8A6f5Ec120AF',
    // @ts-ignore
    signer
  );
};

export const getIERC721Contract = (address: string, signer: ethers.Signer) => {
  return getContract(
    // IERC721ABI,
    IERC721AABI,
    address,
    // @ts-ignore
    signer
  );
};

export const getERC20TokenContract = (signer: ethers.Signer) => {
  return getContract(
    ERC20TokenABI,
    '0x6d11f8b6D06de3e5D089d200a284aDB7cfb8D2b4',
    // @ts-ignore
    signer
  );
};

export const getTestContract = (signer: ethers.Signer) => {
  return getContract(
    TestABI,
    '0x9ce1faDD9f7d3cE11Bb8881251e1b22200133269',
    // @ts-ignore
    signer
  );
};

export const getMintableContract = (address: string, signer: ethers.Signer) => {
  return getContract(
    MintableABI,
    address,
    // @ts-ignore
    signer
  );
};
