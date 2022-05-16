import { Contract } from "ethers";

export const sign = async (contract: Contract, params: string, signer: string) => {
  
    return await contract.sign(params, signer);
    //const receipt = await tx.wait();
    //return receipt.status;
  };
