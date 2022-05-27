// @ts-nocheck
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import { MintEntity } from '@/interfaces';

import Mint from './Mint';

export interface MintTeaserProps {
  mints: Array<MintEntity>;
}

const MintTeaser = ({ mints }: MintTeaserProps) => {
  const renderMints = () =>
    mints &&
    mints.map((mint, key) => (
      <Grid key={key} item xs={4}>
        <Mint {...mint} />
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
        Currently minting
      </Typography>
      <Grid container spacing={3}>
        {renderMints()}
      </Grid>
    </Box>
  );
};

export default MintTeaser;
