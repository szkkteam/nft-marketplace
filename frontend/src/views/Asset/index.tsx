import React from 'react';
import { Grid } from '@mui/material';
import PageLayout from '@/layout/PageLayout';

import { AssetEntity, TokenEntity } from '@/interfaces';

interface AssetProps {
    asset: AssetEntity;
    tokens?: Array<TokenEntity>;
}

import Token from './components/Token';

const Asset = ({asset, tokens}: AssetProps) => {
  
  return (
    <PageLayout>
      <div>Specific asset {asset.name}</div>
      <Grid container spacing={3}>
        {tokens && tokens.map((item: TokenEntity, key: any) => (
          <Grid key={key} item xs={3}>
            <Token token={item} assetAddress={asset.address}/>
          </Grid>)
        )}
      </Grid>
    </PageLayout>
  );
};

export default Asset;
