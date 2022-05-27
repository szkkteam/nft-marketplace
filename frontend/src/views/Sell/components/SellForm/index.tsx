// @ts-nocheck
import { Button, Divider, Grid, Typography } from '@mui/material';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

import useConvertPrice from '@/hooks/useConvertPrice';
import useIERC721 from '@/hooks/useIERC721';
import useMakeOrder from '@/hooks/useMakeOrder';

import NumberInput from '../NumberInput';

export interface SellFormProps {
  address: string;
  token: string;
  proxy: string;
}

const SellForm = ({ address, token, proxy }: SellFormProps) => {
  const { toRaw } = useConvertPrice();
  const { account } = useWeb3React<Web3ReactProvider>();
  const { isApprovedForAll, setApprovalForAll } = useIERC721(address);
  const { makeOrder } = useMakeOrder(address);

  console.log(`
        useMakeOrder address: ${address}
    `);

  const [sellAmount, setSellAmount] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [validPrice, setValidPrice] = useState(false);

  useEffect(() => {
    (async () => {
      const isApproved = await isApprovedForAll(account, proxy);
      if (isApproved) {
        setIsApproved(true);
      }
    })();
  }, [account]);

  const handleSetApproval = async () => {
    try {
      await setApprovalForAll(proxy, true);
      setIsApproved(true);
    } catch (e) {}
  };

  const handleConfirm = async () => {
    const expirationTime = new Date('2023-06-01T00:00:00Z').getTime() / 1000;
    try {
      const convertedPrice = toRaw(sellAmount.toString());
      console.log('convertedPrice: ', convertedPrice);
      await makeOrder(account, token, convertedPrice, '10000000000');
      console.log('order made');

      Router.push(`/assets/${address}/${token}`);
      // TODO: Redirect to success page
    } catch (e) {
      console.error(e);
    }
  };

  const handleNumber = (price: string) => {
    if (price.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setSellAmount(price);
  };

  const handleFloat = () => {
    setSellAmount(parseFloat(sellAmount) || '');
  };

  const buttonProps = {
    disabled: !account,
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h5">
          List item for sale
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" component="p" sx={{ marginBottom: 1 }}>
          Price
        </Typography>
        <NumberInput
          value={sellAmount}
          onChange={handleNumber}
          onBlur={handleFloat}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        {isApproved ? (
          <Button
            {...buttonProps}
            disabled={!sellAmount}
            onClick={handleConfirm}
            variant="contained"
            sx={{ width: '120px' }}
          >
            Confirm
          </Button>
        ) : (
          <Button
            {...buttonProps}
            onClick={handleSetApproval}
            variant="contained"
            sx={{ width: '120px' }}
          >
            Approve
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default SellForm;
