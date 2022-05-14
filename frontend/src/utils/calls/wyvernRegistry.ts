import { Contract } from "ethers";

export const registerProxy = async (contract: Contract) => {
  
    const tx = await contract.registerProxy();
    const receipt = await tx.wait();
    return receipt.status;
  };

export const proxies = async (contract: Contract, address: string) => {
    return await contract && contract.proxies(address);
}