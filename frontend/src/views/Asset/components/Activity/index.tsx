import React, { useState } from 'react';
import { 
  Grid,
  Container,
  Box,
  Typography,
  Divider,
  List

} from '@mui/material';


import TokenListItem from '@/components/TokenListItem';
import useFilterOrders from '../hooks/useFilterOrders';

export interface ActivityProps {
  address: string;
}

const Activity = ({address}: ActivityProps) => {
  
  const { finalized, notFinalized, isLoading } = useFilterOrders(address);

  console.log(`
    finalized: ${finalized}
    notFinalized: ${notFinalized}
    isLoading: ${isLoading}
  `)

  return (
    <>
        <Grid container item xs={12}>
            <Grid item xs={6}>
              <List
                subheader={
                  <Typography variant="h6">{`Recently listed items (${notFinalized.length})`}</Typography>
                }
              >
                {!isLoading? (
                  notFinalized && notFinalized.map(({token: {asset: {name, address}, id}, currentPrice}, key) => (
                    <>
                        <TokenListItem 
                            href={`/assets/${address}/${id}`}
                            price={currentPrice}
                            key={key}
                            name={name}
                            tokenId={id}
                        />
                        <Divider />
                    </>
                  ))
                ) : (
                  <div>Loading ...</div>
                )}
              </List>
            </Grid>
            <Grid item xs={6}>
              
            </Grid>
        </Grid>          
    </>
    
  );
};

export default Activity;
