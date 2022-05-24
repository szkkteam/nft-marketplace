import React from 'react';

import CardLink from '@/components/CardLink';
import NftImage from '@/components/NftImage';

import { Skeleton, Card, CardMedia, ImageListItemBar, CardActionArea   } from '@mui/material';

const Collection = () => {
    return (
        <CardLink href="/asset/simplenft">
            <CardMedia sx={{position: 'relative'}}>
                <NftImage height={280} />
                <ImageListItemBar
                    title="Simple NFT"
                    subtitle="Lorem ipsum dorem sit amet"
                />
            </CardMedia>
        </CardLink>
    )
}

export default Collection;