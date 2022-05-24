import React from 'react';
import { Box, Typography, Grid } from '@mui/material'

import Mint from './Mint';

const MintTeaser = () => {

    
    const mints = [1, 2, 3,];

    const renderMints = () => (
        mints && mints.map((mint, key) => (
            <Grid key={key} item xs={4}>
                <Mint />
            </Grid>
        ))
    )
    return (
        <Box sx={{  }}>
            <Typography variant="h4" sx={{marginBottom: '3rem', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto'}}>
                Currently minting
            </Typography>
            <Grid container spacing={3}>
                {renderMints()}
            </Grid>
        </Box>
    )
}

export default MintTeaser;