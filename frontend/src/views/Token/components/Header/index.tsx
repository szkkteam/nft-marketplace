import React, { ReactNode, useState } from 'react';

import {
    Typography,
    Grid,
    Divider,
} from '@mui/material'

export interface HeaderProps {
    name: string;
    tokenId: string;
    owner: string;
}

const Header = ({name, tokenId, owner} : HeaderProps) => {

    return (
       <Grid container spacing={3}>
           <Grid item xs={12}>
               <Typography variant="body2" component="p">author</Typography>
            </Grid>
            <Grid item xs={12}>
               <Typography variant="h6" component="p" sx={{fontWeight: 'bold'}}>{`${name} #${tokenId}`}</Typography>
            </Grid>
            <Grid item xs={12}>
               <Typography variant="body2" component="p">Owned by <b>{owner}</b></Typography>
            </Grid>
       </Grid>
    )
}

export default Header;