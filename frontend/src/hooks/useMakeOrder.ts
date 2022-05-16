import { useCallback } from 'react';
import { useWyvernExchange, useERC20Token } from '@/hooks/useContract';
import usePrepareOrder from '@/hooks/usePrepareOrder';
import { sign } from '@/utils/calls/wyvernExchange';
import { OrderCreate } from '@/interfaces';
import { createOrder } from '@/utils/api';

const useMakeOrder = (nftAddress: string) => {
  const token = useERC20Token();
  const exchange = useWyvernExchange();
  const { makeOrder, sign } = usePrepareOrder(nftAddress);
 
  const handleMakeOrder = useCallback(
    async (maker: string, tokenId: string, sellingPrice: string, expirationTime: string) => {
      // Listing time
      const listingTime = Math.floor(Date.now() / 1000);
      console.log('listingTime', listingTime);
      const one = makeOrder(maker, tokenId, sellingPrice, listingTime.toString(), expirationTime);
      console.log('one', one);
      console.log('exchange', exchange);
      //const sigOne = await sign(exchange, one, maker);
      const sigOne = await sign(one, maker);
      console.log('sigOne', sigOne);

      const orderPayload: OrderCreate = {
        listingTime: listingTime.toString(),
        expirationTime: expirationTime,
        currentPrice: sellingPrice,
        calldata: sigOne,
        salt: one.salt,
        paymentToken: token?.address,
        token: tokenId,
        asset: nftAddress,
        maker: maker,
      };

      //await createOrder(orderPayload);
    },
    [exchange, token],
  );

  return {
    makeOrder: handleMakeOrder
  }
 
};

export default useMakeOrder;