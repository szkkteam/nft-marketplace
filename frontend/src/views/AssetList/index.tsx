import React from 'react';

import { Grid } from '@mui/material'

import PageLayout from '@/layout/PageLayout';
import { AssetEntity } from '@/interfaces';
import Collection from './components/Collection';

interface AssetProps {
  assets: Array<AssetEntity>;
}

const AssetList = ({assets}: AssetProps) => {
  // const router = useRouter();

  const renderAssets = () => {
    return assets.map((asset: AssetEntity, key) => {
      return (
        <Grid item xs={12} sm={6} md={4} key={key}>
          <Collection asset={asset} />
        </Grid>
      )
    })
  }

  return (
    <PageLayout>
      <div>Asset list:</div>
      { assets? (
        <Grid container spacing={3}>
        {renderAssets()}
      </Grid>
      ) : (
        <div>No assets</div>
      )}
      
    </PageLayout>
  );
};

export default AssetList;
