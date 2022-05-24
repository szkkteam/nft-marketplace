import React from 'react';
import { Box, Typography, Grid } from '@mui/material'

import Collection from './Collection';

const CollectionTeaser = () => {

    const collections = [1, 2, 3,];

    const renderCollections = () => (
        collections && collections.map((collection, key) => (
            <Grid key={key} item xs={4}>
                <Collection />
            </Grid>
        ))
    )

    return (
        <Box sx={{  }}>
            <Typography variant="h4" sx={{marginBottom: '3rem', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto'}}>
                Recently added collections
            </Typography>
            <Grid container spacing={3}>
                {renderCollections()}
            </Grid>
        </Box>
        
    )
}

export default CollectionTeaser;