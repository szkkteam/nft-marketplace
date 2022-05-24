import React from 'react';

import CardLink from '@/components/CardLink';
import NftImage from '@/components/NftImage';

import { CardMedia, ImageListItemBar   } from '@mui/material';

const Mint = () => {
    return (
        <CardLink href="/asset/simplenft">
            <CardMedia sx={{position: 'relative'}}>
            <NftImage height={280} />
                <ImageListItemBar
                    title="Simple NFT"
                    subtitle="20 / 10,000"
                />
            </CardMedia>

        </CardLink>
    )
}

export default Mint;