
export const verify = async (contract: Contract, hash, maker, signature) => {
    return await contract.verify(hash, maker, signature);
  }