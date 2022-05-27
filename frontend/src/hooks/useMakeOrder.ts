import { useCallback } from 'react';

import {
  useERC20Token,
  useTestContract,
  useWyvernExchange,
} from '@/hooks/useContract';
import usePrepareOrder from '@/hooks/usePrepareOrder';
import { OrderCreate } from '@/interfaces';
import { createOrder } from '@/utils/api';
import { hashOrder_ } from '@/utils/calls/wyvernExchange';

const useMakeOrder = (nftAddress: string) => {
  const token = useERC20Token();
  const exchange = useWyvernExchange();
  const { makeOrder, sign } = usePrepareOrder(nftAddress);

  const test = useTestContract();

  const handleMakeOrder = useCallback(
    async (
      maker: string,
      tokenId: string,
      currentPrice: string,
      expirationTime: string
    ) => {
      // Listing time
      const listingTime = Math.floor(Date.now() / 1000).toString();
      // const listingTime = "0";
      const one = makeOrder(
        maker,
        tokenId,
        currentPrice,
        listingTime,
        expirationTime
      );
      // const sigOne = await sign(exchange, one, maker);
      const { v, r, s } = await sign(one, maker);
      // @ts-ignore
      const hash = await hashOrder_(exchange, one);

      const orderPayload: OrderCreate = {
        listingTime,
        expirationTime,
        currentPrice,
        // TODO: What to include here?
        calldata: '0x0',
        v,
        r,
        s,
        salt: one.salt,
        // @ts-ignore
        paymentToken: token?.address,
        token: tokenId,
        asset: nftAddress,
        maker,
      };

      await createOrder(orderPayload);
    },
    [exchange, token, nftAddress, test]
  );

  return {
    makeOrder: handleMakeOrder,
  };
};

export default useMakeOrder;
