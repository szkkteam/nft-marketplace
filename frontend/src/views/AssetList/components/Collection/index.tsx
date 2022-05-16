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
import { AssetEntity } from '@/interfaces';

export interface CollectionProps {
    asset: AssetEntity;
}

const Collection = ({ asset }: CollectionProps) => {
    const { name, slug, address } = asset;

    return (
        <Card>
            <CardMedia
            component="img"
            height="140"
            //image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>                
            </CardContent>
            <CardActions>
                <Button size="small" disabled={true}>Share</Button>
                <LinkButton href={`/asset/${slug}`} size="small">Open</LinkButton>
            </CardActions>
        </Card>
    )
}

export default Collection