// @ts-nocheck
import { Divider, Grid, List, Typography } from '@mui/material';
import React from 'react';

import TokenListItem from '@/components/TokenListItem';

import useFilterOrders from '../hooks/useFilterOrders';

export interface ActivityProps {
  address: string;
}

const Activity = ({ address }: ActivityProps) => {
  const { finalized, notFinalized, isLoading } = useFilterOrders(address);

  console.log(`
    finalized: ${finalized}
    notFinalized: ${notFinalized}
    isLoading: ${isLoading}
  `);

  return (
    <>
      <Grid container item xs={12}>
        <Grid item xs={4}>
          <List
            subheader={
              <Typography variant="h6">{`Recently listed items (${notFinalized.length})`}</Typography>
            }
          >
            {!isLoading ? (
              notFinalized &&
              notFinalized.map(
                (
                  {
                    token: {
                      asset: { name, address },
                      id,
                    },
                    currentPrice,
                  },
                  key
                ) => (
                  <span key={key}>
                    <TokenListItem
                      href={`/assets/${address}/${id}`}
                      price={currentPrice}
                      name={name}
                      tokenId={id}
                    />
                    <Divider />
                  </span>
                )
              )
            ) : (
              <div>Loading ...</div>
            )}
          </List>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <List
            subheader={
              <Typography variant="h6">{`Recently sold items (${finalized.length})`}</Typography>
            }
          >
            {!isLoading ? (
              finalized &&
              finalized.map(
                (
                  {
                    token: {
                      asset: { name, address },
                      id,
                    },
                    currentPrice,
                  },
                  key
                ) => (
                  <span key={key}>
                    <TokenListItem
                      href={`/assets/${address}/${id}`}
                      price={currentPrice}
                      name={name}
                      tokenId={id}
                    />
                    <Divider />
                  </span>
                )
              )
            ) : (
              <div>Loading ...</div>
            )}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default Activity;
