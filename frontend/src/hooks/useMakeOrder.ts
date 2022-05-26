import { useCallback } from 'react';
import { useWyvernExchange, useERC20Token, useTestContract } from '@/hooks/useContract';
import usePrepareOrder from '@/hooks/usePrepareOrder';
import { OrderCreate } from '@/interfaces';
import { createOrder } from '@/utils/api';
import { hashOrder_, validateOrderAuthorization_} from '@/utils/calls/wyvernExchange';
import { verify } from '@/utils/calls/test';

const useMakeOrder = (nftAddress: string) => {
  const token = useERC20Token();
  const exchange = useWyvernExchange();
  const { makeOrder, sign, encodeSignatureSingle } = usePrepareOrder(nftAddress);

  const test = useTestContract();
 
  const handleMakeOrder = useCallback(
    async (maker: string, tokenId: string, currentPrice: string, expirationTime: string) => {
      // Listing time
      const listingTime = (Math.floor(Date.now() / 1000)).toString();
      //const listingTime = "0";
      const one = makeOrder(maker, tokenId, currentPrice, listingTime, expirationTime);
      //const sigOne = await sign(exchange, one, maker);
      const {v, r, s} = await sign(one, maker);

      console.log(`
      one: ${JSON.stringify(one)}
      vrs: ${JSON.stringify({v, r, s})}
      `)

      const hash = await hashOrder_(exchange, one);
      const encodedSig = encodeSignatureSingle({v, r, s});

      console.log(`
        hash: ${JSON.stringify(hash)}
        encodedSig: ${JSON.stringify(encodedSig)}
        maker: ${maker}
      `)
      const taker = "0xfBcE226490DEafC60ada401FFf03Fe2977d1E69C";

      const validation = await verify(test, hash, maker, encodedSig);

      //const validation = await validateOrderAuthorization_(exchange, hash, maker, encodedSig);
      console.log(`
      validation: ${JSON.stringify(validation)}
      `)

      const orderPayload: OrderCreate = {
        listingTime,
        expirationTime,
        currentPrice,
        // TODO: What to include here?
        calldata: "0x0",
        v,
        r,
        s,
        salt: one.salt,
        paymentToken: token?.address,
        token: tokenId,
        asset: nftAddress,
        maker: maker,
      };
      console.log(orderPayload);

      const retval = await createOrder(orderPayload);
      console.log(retval);
    },
    [exchange, token, nftAddress, test],
  );

  return {
    makeOrder: handleMakeOrder
  }
 
};

export default useMakeOrder;
