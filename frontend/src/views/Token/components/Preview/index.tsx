import React from 'react';

import NftImage from '@/components/NftImage';

import { Skeleton, Card, CardMedia, ImageListItemBar, CardActionArea   } from '@mui/material';

const Preview = () => {
    return (
        <Card>
            <CardMedia sx={{position: 'relative'}}>
                <NftImage height={360} />                
            </CardMedia>
        </Card>
    )
}

export default Preview;