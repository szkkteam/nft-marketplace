import { ContractInterface, ethers, Signer } from 'ethers';

import wyvernRegistryAbi from '@/config/abi/WyvernRegistry.json';
import IERC721ABI from '@/config/abi/IERC721.json';
import StaticMarketABI from '@/config/abi/StaticMarket.json';
import ExchangeABI from '@/config/abi/Exchange.json';
import ERC20TokenABI from '@/config/abi/Token.json';
import TestABI from '@/config/abi/Test.json';
import { JsonRpcSigner } from '@ethersproject/providers';

const getContract = (abi: ContractInterface, address: string, signer: JsonRpcSigner) => {
  return new ethers.Contract(address, abi, signer);
};

export const getWyvernRegistryContract = (signer: ethers.Signer) => {
  return getContract(
    // @ts-ignore
    wyvernRegistryAbi,
    '0x875Cf821d2a794a3D8f977eA38F9e1030f4C41D5',
    signer,
  );
};

export const getWyvernStaticMarketContract = (signer: ethers.Signer) => {
  return getContract(
    StaticMarketABI,
    '0x696b956aa5A2707Fe7dea1D2840a3fD677257323',
    // @ts-ignore
    signer,
  );
};

export const getWyvernExchangeContract = (signer: ethers.Signer) => {
  return getContract(
    ExchangeABI,
    '0x0276D043888549C4D2b6De960666E0736760466c',
    // @ts-ignore
    signer,
  );
};

export const getIERC721Contract = (address: string, signer: ethers.Signer) => {
  return getContract(
    IERC721ABI,
    address,
    // @ts-ignore
    signer,
  );
};

export const getERC20TokenContract = (signer: ethers.Signer) => {
  return getContract(
    ERC20TokenABI,
    "0x8aC34ed4fd05A6a1210C3D33f75aFb95Ef4993Fb",
    // @ts-ignore
    signer,
  );
}

export const getTestContract = (signer: ethers.Signer) => {
  return getContract(
    TestABI,
    "0xB6Fb242636173dc882c859E44A08Be48cF317371",
    // @ts-ignore
    signer,
  )
}

const TEST = "0xA8b9487c3397580943eE1638948B3d3F8D20053C"
const ERC20 = "0x8aC34ed4fd05A6a1210C3D33f75aFb95Ef4993Fb"
const wyvernExchange = "0x0276D043888549C4D2b6De960666E0736760466c"
const staticMarket = "0x696b956aa5A2707Fe7dea1D2840a3fD677257323"
const wyvernStatic = "0xe27bb5bb21281ca2852e47fE7a46879614E91434"
const wyvernAtomicizer = "0x7DFF64100183cA84fF1b7e24F1c428881c022fb2"