import { useCallback } from 'react';
import { useWyvernExchange, useERC20Token } from '@/hooks/useContract';
import usePrepareOrder from '@/hooks/usePrepareOrder';
import { sign } from '@/utils/calls/wyvernExchange';
import { OrderCreate } from '@/interfaces';
import { createOrder } from '@/utils/api';

import { TokenEntity } from '@/interfaces/token';

const useTakeOrder = (tokenData: TokenEntity) => {
  const nftAddress = tokenData.asset.address;
  const tokenId = tokenData.id;
  const maker = tokenData.orders[0].maker;
  const sellingPrice = tokenData.orders[0].currentPrice;
  const listingTime = tokenData.orders[0].listingTime;
  const expirationTime = tokenData.orders[0].expirationTime;


  const token = useERC20Token();
  const exchange = useWyvernExchange();
  const { makeOrder, sign } = usePrepareOrder(nftAddress);
 
  const handleTakeOrder = useCallback(
    async (maker: string, tokenId: string, sellingPrice: string, expirationTime: string) => {
      // Listing time
      const listingTime = Math.floor(Date.now() / 1000);
      const one = makeOrder(maker, tokenId, sellingPrice, listingTime.toString(), expirationTime);
      //const sigOne = await sign(exchange, one, maker);
      const sigOne = await sign(one, maker);

      
    },
    [exchange, token, tokenData],
  );

  return {
    takeOrder: handleTakeOrder
  }
 
};

export default useTakeOrder;