import React, { useState } from 'react';

import {
    Paper,
    Typography,
    Box,
    Grid,
    Divider,
} from '@mui/material'

import TokenPrice from '@/components/TokenPrice';

export interface ActionsProps {
    action: React.ReactNode;
    listingPrice?: string;
    owned: boolean;
}

const Actions = ({action, owned, listingPrice=undefined} : ActionsProps) => {

    return (
        <Paper>
            <Box sx={{padding: 3}}>
                
                {listingPrice ? (
                    <>
                        <Typography variant="body2" sx={{marginBottom: 1}}>Price</Typography>
                        <TokenPrice variant="h6" rawPrice={listingPrice} />
                    </>
                ) : (
                <Typography variant="body2" component="p" sx={{fontWeight: 'bold'}}>
                    {`The item is not listed yet. ${owned? 'Click below to list': ''}`}
                </Typography>
                )}
                {action && <Box sx={{marginTop: 2}}/>}
                {action}
            </Box>
        </Paper>
       
    )
}

export default Actions;