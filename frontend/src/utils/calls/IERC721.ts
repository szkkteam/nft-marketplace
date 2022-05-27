import { Contract } from 'ethers';

export const setApprovalForAll = async (
  contract: Contract,
  operator: string,
  approved: boolean
) => {
  const tx = await contract.setApprovalForAll(operator, approved);
  const receipt = await tx.wait();
  return receipt.status;
};

export const getApproved = async (contract: Contract, tokenId: string) => {
  return (await contract) && contract.getApproved(tokenId);
};

export const isApprovedForAll = async (
  contract: Contract,
  owner: string,
  operator: string
): Promise<boolean> => {
  return (await contract) && contract.isApprovedForAll(owner, operator);
};

export const totalSupply = async (contract: Contract): Promise<string> => {
  return (await contract) && contract.totalSupply();
};
