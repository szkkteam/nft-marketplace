import { CardMedia, ImageListItemBar } from '@mui/material';
import React from 'react';

import CardLink from '@/components/CardLink';
import NftImage from '@/components/NftImage';

export interface CollectionProps {
  name: string;
  slug: string;
}

const Collection = ({ name, slug }: CollectionProps) => {
  return (
    <CardLink href={`/asset/${slug}`}>
      <CardMedia sx={{ position: 'relative' }}>
        <NftImage height={280} />
        <ImageListItemBar title={name} subtitle="Lorem ipsum dorem sit amet" />
      </CardMedia>
    </CardLink>
  );
};

export default Collection;
