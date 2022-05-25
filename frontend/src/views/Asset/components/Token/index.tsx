import React, { ReactChild } from 'react';


import {
    Box,
    Card,
    Grid,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
} from '@mui/material'

import CardLink from '@/components/CardLink';
import NftImage from '@/components/NftImage';
import TokenPrice from '@/components/TokenPrice';

import { TokenEntity, AssetEntity } from '@/interfaces';

export interface TokenProps {
    token: TokenEntity;
    asset: AssetEntity;
}

const Token = ({token, asset}: TokenProps ) => {
    const { id, uri } = token;
    const { name, address } = asset;

    const hasOrder = token?.orders && token?.orders.length > 0;

    return (
        <CardLink href={`/assets/${address}/${id}`}>
            <CardMedia sx={{position: 'relative'}}>
                <NftImage height={250} />                
            </CardMedia>
            <CardContent>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="caption" component="p" sx={{fontWeight: 'bold'}}>
                                {name}
                            </Typography>
                            <Typography variant="caption" component="p" sx={{fontWeight: 'bold'}}>
                                {`#${id}`}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        {hasOrder && <Box sx={{textAlign: 'right'}}>
                            <Typography variant="caption" component="p" sx={{fontWeight: 'bold'}}>
                                Price
                            </Typography>
                            <TokenPrice rawPrice={token.orders[0].currentPrice} />                            
                        </Box> }
                    </Grid>
                </Grid>                
            </CardContent>
        </CardLink>
    )   
}

export default Token;