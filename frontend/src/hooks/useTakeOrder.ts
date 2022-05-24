import { useCallback } from 'react';
import { useWyvernExchange, useERC20Token } from '@/hooks/useContract';
import usePrepareOrder from '@/hooks/usePrepareOrder';
import { atomicMatch_, hashOrder_, validateOrderAuthorization_ } from '@/utils/calls/wyvernExchange';
import { OrderCreate, Signature } from '@/interfaces';
import { finalizeOrder } from '@/utils/api';

import { TokenEntity, OrderEntity } from '@/interfaces/token';

const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000'
const NULL_SIG: Signature = {v: 27, r: ZERO_BYTES32, s: ZERO_BYTES32}

const useTakeOrder = (nftAddress: string, tokenId: string, orderId: string) => {
  
  const token = useERC20Token();
  const exchange = useWyvernExchange();
  const { takeOrder, sign, encodeSignature, encodeSignatureSingle, makeOrder } = usePrepareOrder(nftAddress);
 
  const handleTakeOrder = useCallback(
    async (taker: string, maker: string, sellingPrice: string, listingTime: string, expirationTime: string, salt: string, sig: Signature) => {
      // Listing time
      
      const one = makeOrder(maker, tokenId, sellingPrice, listingTime, expirationTime, salt);
      const { two, firstCall, secondCall } = takeOrder(maker, taker, tokenId, sellingPrice, listingTime, expirationTime, salt);
      const counterSig: Signature = await sign(two, taker);
      
      const hash = await hashOrder_(exchange, one);
      const encodedSig = encodeSignatureSingle(sig);

      console.log(`
        hash: ${JSON.stringify(hash)}
        encodedSig: ${JSON.stringify(encodedSig)}
        maker: ${maker}
      `)

      const validation = await validateOrderAuthorization_(exchange, hash, maker, encodedSig);
      console.log(`
      validation: ${validation}
      `)
      
      const encodedSignature = encodeSignature(sig, counterSig);
      console.log(`
      one: ${JSON.stringify(one)}
      two: ${JSON.stringify(two)}
      sig: ${JSON.stringify(sig)}}      
      firstCall: ${JSON.stringify(firstCall)}
      secondCall: ${JSON.stringify(secondCall)}
      encodedSignature: ${JSON.stringify(encodedSignature)}
    `)
      
      await atomicMatch_(exchange, one, firstCall, two, secondCall, encodedSignature, ZERO_BYTES32, {from: taker});
      /*
      await finalizeOrder(orderId, taker);
      */
    },
    [exchange, token],
  );

  return {
    takeOrder: handleTakeOrder
  }
 
};

export default useTakeOrder;