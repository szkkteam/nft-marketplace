import { CardMedia, ImageListItemBar } from '@mui/material';
import React from 'react';

import CardLink from '@/components/CardLink';
import NftImage from '@/components/NftImage';

export interface MintProps {
  name: string;
  slug: string;
  supply?: {
    totalSupply: string;
    maximumSupply: string;
  };
}

const Mint = ({ name, slug, supply }: MintProps) => {
  const { totalSupply, maximumSupply } = supply || {};
  return (
    <CardLink href={`/asset/${slug}`}>
      <CardMedia sx={{ position: 'relative' }}>
        <NftImage height={280} />
        <ImageListItemBar
          title={name}
          subtitle={`${totalSupply} / ${maximumSupply}`}
        />
      </CardMedia>
    </CardLink>
  );
};

export default Mint;
