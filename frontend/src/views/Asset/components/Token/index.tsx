import React from 'react';


import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
} from '@mui/material'
import LinkButton from '@/components/LinkButton';
import { TokenEntity } from '@/interfaces';

export interface TokenProps {
    token: TokenEntity;
    assetAddress: string;
}

const Token = ({token, assetAddress}: TokenProps ) => {
    const { id, uri } = token;

    return (
        <Card>
            <CardMedia
            component="img"
            height="140"
            //image="/static/images/cards/contemplative-reptile.jpg"
            alt="token uri"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Listing price and others
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>                
            </CardContent>
            <CardActions>
                <LinkButton href={`/assets/${assetAddress}/${id}`} size="small">Details</LinkButton>
                <Button size="small" disabled={true}>Buy</Button>
            </CardActions>
        </Card>
    )
}

export default Token;