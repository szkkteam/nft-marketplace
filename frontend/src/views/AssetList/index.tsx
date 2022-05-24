import React from 'react';

import { Grid, Container } from '@mui/material'

import PageLayout from '@/layout/PageLayout';
import { AssetEntity } from '@/interfaces';
import Collection from './components/Collection';

import Header from './components/Header';

interface AssetProps {
  assets: Array<AssetEntity>;
}

const AssetList = ({assets}: AssetProps) => {
  // const router = useRouter();

  const renderAssets = () => {
    return assets.map((asset: AssetEntity, key) => {
      return (
        <Grid item xs={6} sm={4} md={3} key={key}>
          <Collection asset={asset} />
        </Grid>
      )
    })
  }

  return (
    <PageLayout>
      <Container >
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item container xs={12} spacing={3}>
            {assets && renderAssets()}  
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default AssetList;
