// @ts-nocheck
import { Card, CardMedia } from '@mui/material';
import React from 'react';

import NftImage from '@/components/NftImage';

const TokenPreview = () => {
  return (
    <Card>
      <CardMedia sx={{ position: 'relative' }}>
        <NftImage height={360} />
      </CardMedia>
    </Card>
  );
};

export default TokenPreview;
