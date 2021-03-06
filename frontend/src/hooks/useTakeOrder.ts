// @ts-nocheck
import { useCallback } from 'react';

import { useERC20Token, useWyvernExchange } from '@/hooks/useContract';
import usePrepareOrder from '@/hooks/usePrepareOrder';
import { Signature } from '@/interfaces';
import { finalizeOrder } from '@/utils/api';
import {
  atomicMatch_,
  hashOrder_,
  validateOrderAuthorization_,
} from '@/utils/calls/wyvernExchange';

const ZERO_BYTES32 =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
const NULL_SIG: Signature = { v: 27, r: ZERO_BYTES32, s: ZERO_BYTES32 };

const useTakeOrder = (nftAddress: string, tokenId: string, orderId: string) => {
  const token = useERC20Token();
  const exchange = useWyvernExchange();
  const { takeOrder, sign, encodeSignature, encodeSignatureSingle, makeOrder } =
    usePrepareOrder(nftAddress);

  const handleTakeOrder = useCallback(
    async (
      taker: string,
      maker: string,
      sellingPrice: string,
      listingTime: string,
      expirationTime: string,
      salt: string,
      sig: Signature
    ) => {
      // Listing time

      console.log(`
        taker: ${taker}
        maker: ${maker}
        sellingPrice: ${sellingPrice}
        listingTime: ${listingTime}
        expirationTime: ${expirationTime}
        salt: ${salt}
      
      `);

      // const one = makeOrder(maker, tokenId, sellingPrice, listingTime, expirationTime, salt);
      const { one, two, firstCall, secondCall } = takeOrder(
        maker,
        taker,
        tokenId,
        sellingPrice,
        listingTime,
        expirationTime,
        salt
      );
      // const counterSig: Signature = await sign(two, taker);

      const counterSig: Signature = {
        v: '27',
        r: '0xfdb3a09b16066fe8324d0998030cf88294c27b436a54eef45a9e57d81f230085',
        s: '0x3e270fcd15a186d37f318eb08a26039ced7d086e676bfd02c9ed773ee9e984ae',
      };

      const hash = await hashOrder_(exchange, one);
      const encodedSig = encodeSignatureSingle(sig);

      console.log(`
        hash: ${JSON.stringify(hash)}
        encodedSig: ${JSON.stringify(encodedSig)}
        maker: ${maker}
      `);

      const validation = await validateOrderAuthorization_(
        exchange,
        hash,
        maker,
        encodedSig
      );
      console.log(`
      validation: ${validation}
      `);

      const encodedSignature = encodeSignature(sig, counterSig);
      console.log(`
      one: ${JSON.stringify(one)}
      two: ${JSON.stringify(two)}
      sig: ${JSON.stringify(sig)}}      
      firstCall: ${JSON.stringify(firstCall)}
      secondCall: ${JSON.stringify(secondCall)}
      encodedSignature: ${JSON.stringify(encodedSignature)}
    `);

      await atomicMatch_(
        exchange,
        one,
        firstCall,
        two,
        secondCall,
        encodedSignature,
        ZERO_BYTES32,
        { from: taker }
      );

      await finalizeOrder(orderId, taker);
    },
    [exchange, token]
  );

  return {
    takeOrder: handleTakeOrder,
  };
};

export default useTakeOrder;
