import React from 'react';

import {
    Typography,
    Grid,
    Box,
    Button
} from '@mui/material';

import LinkButton from '@/components/LinkButton';

const Hero = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Typography variant="h4" component="h1" sx={{fontWeight: 'bold', paddingBottom: '1rem'}}>
                    Discover, collect, and sell NFTs
                </Typography>
                <Typography variant="h6" component="p">
                    The first NFT marketplace for the Ethereum blockchain.
                </Typography>
                <Box sx={{paddingTop: '1rem'}}>
                    <LinkButton href='/asset' variant='contained' sx={{width: 120}}>
                        Explore
                    </LinkButton>
                    <LinkButton href='/' variant='contained' sx={{marginLeft: '2rem', width: 120}}>
                        Mint
                    </LinkButton>
                </Box>
            </Grid>
            <Grid item xs={6}></Grid>
        </Grid>
    )
}

export default Hero;