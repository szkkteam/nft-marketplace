import { Container, Grid } from '@mui/material';
import React, { useState } from 'react';

import { AssetEntity, TokenEntity } from '@/interfaces';
import PageLayout from '@/layout/PageLayout';

import Activity from './components/Activity';
import Header from './components/Header';
import TokenList from './components/TokenList';

interface AssetProps {
  asset: AssetEntity;
  tokens?: Array<TokenEntity>;
}

const Asset = ({ asset, tokens }: AssetProps) => {
  const [value, setValue] = useState(0);

  // @ts-ignore
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PageLayout marginTop={5}>
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Header name={asset.name} value={value} onChange={handleChange} />
          </Grid>
          {value === 0 ? (
            <TokenList tokens={tokens} asset={asset} />
          ) : (
            // @ts-ignore
            <Activity address={asset.address} />
          )}
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default Asset;
