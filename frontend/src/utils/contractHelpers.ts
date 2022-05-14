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
    '0x51E498B4AaaEe3a5Bfc8688a0B6dB97dA3099373',
    signer,
  );
};