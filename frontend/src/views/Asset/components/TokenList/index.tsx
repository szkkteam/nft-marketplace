import React, { useState } from 'react';
import { Grid, Container, Box, Typography } from '@mui/material';

import { AssetEntity, TokenEntity } from '@/interfaces';

interface TokenListProps {
    asset: AssetEntity;
    tokens?: Array<TokenEntity>;
}

import Token from '../Token';

const TokenList = ({asset, tokens}: TokenListProps) => {
  
  return (
    <>
        <Grid item xs={12}>
            <Box >
                <Typography variant="body2" component="p">
                {`${tokens?.length} items`}
                </Typography>
            </Box>
        </Grid>          
        <Grid item container xs={12} spacing={3}>
        {tokens && tokens.map((item: TokenEntity, key: any) => (
            <Grid key={key} item xs={6} sm={4} md={3} lg={2}>
                <Token token={item} asset={asset}/>
            </Grid>)
        )}
        </Grid>
    </>
    
  );
};

export default TokenList;
