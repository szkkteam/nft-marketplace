import React, { useState } from 'react';
import { Grid, Container, Box, Typography } from '@mui/material';
import PageLayout from '@/layout/PageLayout';

import { AssetEntity, TokenEntity } from '@/interfaces';

interface AssetProps {
    asset: AssetEntity;
    tokens?: Array<TokenEntity>;
}

import Header from './components/Header';
import Token from './components/Token';
import TokenList from './components/TokenList';
import Activity from './components/Activity';


const Asset = ({asset, tokens}: AssetProps) => {
  
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  } 

  return (
    <PageLayout marginTop={5}>
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Header name={asset.name} value={value} onChange={handleChange}/>
          </Grid>
          {value === 0? (
              <TokenList tokens={tokens} asset={asset}/>
            ) : (
              <Activity address={asset.address}/>
            )}
        </Grid>
      </Container>
      
    </PageLayout>
  );
};

export default Asset;
