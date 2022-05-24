import React from 'react';

import {
    Card,
    Box,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
} from '@mui/material'

import CardLink from '@/components/CardLink';
import NftImage from '@/components/NftImage';

import LinkButton from '@/components/LinkButton';
import { AssetEntity } from '@/interfaces';

export interface CollectionProps {
    asset: AssetEntity;
}

const Collection = ({ asset }: CollectionProps) => {
    const { name, slug, address } = asset;


    return (
        <CardLink href={`/asset/${slug}`}>
            <CardMedia sx={{position: 'relative'}}>
                <NftImage height={160} />                
            </CardMedia>
            <CardContent>
                <Box sx={{marginLeft: 'auto', marginRight: 'auto', width: 'fit-content'}}>
                    <Typography variant="h6" component="h2">{name}</Typography>
                    <Typography variant="body2" component="p">by author</Typography>
                </Box>
            </CardContent>
        </CardLink>
    )
}

export default Collection