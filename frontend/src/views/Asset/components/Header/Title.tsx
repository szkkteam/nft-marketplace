import React, { useState } from 'react';

import {
    Typography,
    Tab,
    Tabs,
    Divider,
    Container,
    Box
} from '@mui/material'

export interface TitleProps {
    name: string;
}

const Title = ({name} : TitleProps) => {
    return (
        <Box>
            <Typography variant="h4" component="h1" sx={{fontWeight: 'bold', paddingBottom: '1rem', marginLeft: 'auto', marginRight: 'auto', width: 'fit-content'}}>
                {name}
            </Typography>
            <Typography variant="body2" sx={{marginLeft: 'auto', marginRight: 'auto', width: 'fit-content'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
        </Box>
    )
}

export default Title;