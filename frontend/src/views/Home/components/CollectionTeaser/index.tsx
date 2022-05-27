import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import { AssetEntity } from '@/interfaces';

import Collection from './Collection';

export interface CollectionTeaserProps {
  assets: Array<AssetEntity>;
}

const CollectionTeaser = ({ assets }: CollectionTeaserProps) => {
  const renderCollections = () =>
    assets &&
    assets.map((asset, key) => (
      <Grid key={key} item xs={4}>
        <Collection {...asset} />
      </Grid>
    ));

  return (
    <Box sx={{}}>
      <Typography
        variant="h4"
        sx={{
          marginBottom: '3rem',
          width: 'fit-content',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Recently added collections
      </Typography>
      <Grid container spacing={3}>
        {renderCollections()}
      </Grid>
    </Box>
  );
};

export default CollectionTeaser;
