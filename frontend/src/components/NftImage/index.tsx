import React from 'react';

import { Skeleton } from '@mui/material';

export interface NftImageProps {
    isLoading?: boolean;
    height?: number | string;
}

const NftImage = ({height = 280, isLoading = false}: NftImageProps) => {
    // TODO: Get the src also, and if is loading, show a skeleton

    return (
        <Skeleton sx={{height}} animation="wave" variant="rectangular" />
    )
}

export default NftImage;