import React from 'react';
import { Box, Typography, Grid } from '@mui/material'

import Mint from './Mint';

import { MintEntity } from '@/interfaces';

export interface MintTeaserProps {
    mints: Array<MintEntity>;
}

const MintTeaser = ({mints} : MintTeaserProps) => {

    const renderMints = () => (
        mints && mints.map((mint, key) => (
            <Grid key={key} item xs={4}>
                <Mint {...mint} />
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