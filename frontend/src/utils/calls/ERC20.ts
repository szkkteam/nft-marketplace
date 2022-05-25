import { Contract } from "ethers";

export const approve = async (contract: Contract, spender: string, amount: string) => {
    const tx = await contract.approve(spender, amount);
    const receipt = await tx.wait();
    return receipt.status;
  };

  export const decimals = async (contract: Contract) => {
    return await contract && contract.decimals();
}

export const isApprovedForAll = async (contract: Contract, owner: string, operator: string) : Promise<boolean> => {
    return await contract && contract.isApprovedForAll(owner, operator);
}