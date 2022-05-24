import React, { useState } from 'react';

import {
    Typography,
    Tab,
    Tabs,
    Divider,
    Container,
    Box
} from '@mui/material'

import Title from './Title';

export interface HeaderProps {
    name: string;
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const Header = ({name, value, onChange} : HeaderProps) => {

    return (
        <>
            <Title name={name}/>
            <Box sx={{width: '100%', marginTop: '2rem'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={onChange} centered>
                        <Tab label="Items" />
                        <Tab label="Activity"/>
                    </Tabs>
                </Box>
            </Box>
        </>
        
    )
}

export default Header;