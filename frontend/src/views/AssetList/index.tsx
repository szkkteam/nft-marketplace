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

  return (
    <PageLayout>
      <div>Asset list:</div>
      <Grid container spacing={3}>
        {assets.map((item: AssetEntity, key) => (
          <Grid key={key} item xs={3}>
              <Collection asset={item} />
          </Grid>
        )
        )}  
      </Grid>

    </PageLayout>
  );
};

export default AssetList;
