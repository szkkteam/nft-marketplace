import { Contract } from "ethers";
// @ts-ignore
export const atomicMatch_ = async (contract: Contract, order, call, counterorder, countercall, encodedSignature, metadata, misc) => {

    const tx = await contract.atomicMatch_(
      [order.registry, order.maker, order.staticTarget, order.maximumFill, order.listingTime, order.expirationTime, order.salt, call.target,
        counterorder.registry, counterorder.maker, counterorder.staticTarget, counterorder.maximumFill, counterorder.listingTime, counterorder.expirationTime, counterorder.salt, countercall.target],

      [order.staticSelector, counterorder.staticSelector],
      order.staticExtradata, call.data, counterorder.staticExtradata, countercall.data,

      [call.howToCall, countercall.howToCall],
      metadata,
      encodedSignature,
      misc
    );
    const receipt = await tx.wait();
    return receipt.status;
  };

export const hashOrder_ = async (contract: Contract, order) => {
  return await contract.hashOrder_(order.registry, order.maker, order.staticTarget, order.staticSelector, order.staticExtradata, order.maximumFill, order.listingTime, order.expirationTime, order.salt);
}

export const validateOrderAuthorization_ = async (contract: Contract, hash, maker, signature) => {
  return await contract.validateOrderAuthorization_(hash, maker, signature);
}