import { Box, Container, Grid } from '@mui/material';
import Router from 'next/router';
import React, { useEffect } from 'react';

import TokenPreview from '@/components/TokenPreview';
import useHasAccount from '@/hooks/useHasAccount';
import PageLayout from '@/layout/PageLayout';

import Header from './components/Header';
import SellForm from './components/SellForm';

export interface SellProp {
  address: string;
  token: string;
}

const Sell = ({ address, token }: SellProp) => {
  const { proxyAccount, isLoading } = useHasAccount();

  console.log(`
        token: ${JSON.stringify(token)}
    `);

  useEffect(() => {
    // Redirect if not registered
    if (!isLoading && !proxyAccount) {
      Router.push('/account');
    }
  }, [isLoading]);

  return (
    <PageLayout>
      <Container maxWidth="lg">
        <Header name="Simple NFT" address={address} tokenId={token} />
        <Box sx={{ marginBottom: 2 }} />
        <Grid container sx={{ marginLeft: 4 }} spacing={6}>
          <Grid item xs={6}>
            {!isLoading && (
              <SellForm
                address={address}
                token={token}
                proxy={!isLoading && proxyAccount?.proxy}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <TokenPreview />
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default Sell;
