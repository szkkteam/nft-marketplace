import React, { useState } from 'react';

import {
    Typography,
    Tab,
    Tabs,
    Divider,
    Container,
    Box
} from '@mui/material'

const Header = () => {
    const [value, setValue] = useState(0);


    return (
        <Container fixed>
            <Typography variant="h4" component="h1" sx={{fontWeight: 'bold', paddingBottom: '1rem', marginLeft: 'auto', marginRight: 'auto', width: 'fit-content'}}>
                Explore Collections
            </Typography>
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value}>
                        <Tab label="Trending" />
                        <Tab label="Top" disabled/>
                        <Tab label="Art" disabled/>
                        <Tab label="Collectibles" disabled/>
                        <Tab label="Music" disabled/>
                        <Tab label="Photography" disabled/>
                        <Tab label="Sports" disabled/>
                        <Tab label="Trading Cards" disabled/>
                    </Tabs>
                </Box>
            </Box>
        </Container>
        
    )
}

export default Header;