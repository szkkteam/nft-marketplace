import { ContractInterface, ethers } from 'ethers';

import { abi as wyvernRegistryAbi} from '@/config/abi/WyvernRegistry.json';
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

const wyvernExchange = "0x0276D043888549C4D2b6De960666E0736760466c"
const staticMarket = "0x696b956aa5A2707Fe7dea1D2840a3fD677257323"
const wyvernStatic = "0xe27bb5bb21281ca2852e47fE7a46879614E91434"
const wyvernAtomicizer = "0x7DFF64100183cA84fF1b7e24F1c428881c022fb2"