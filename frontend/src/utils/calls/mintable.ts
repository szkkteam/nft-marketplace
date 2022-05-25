import { Contract } from "ethers";

export const mint = async (contract: Contract, amount: string, params: Object) => {
    const tx = await contract.mint(amount, params);
    const receipt = await tx.wait();
    return receipt.status;
  };
