import { Skeleton } from '@mui/material';
import React from 'react';

export interface NftImageProps {
  isLoading?: boolean;
  height?: number | string;
}

const NftImage = ({ height = 280, isLoading = false }: NftImageProps) => {
  // TODO: Get the src also, and if is loading, show a skeleton
  if (isLoading) {
  }
  return <Skeleton sx={{ height }} animation="wave" variant="rectangular" />;
};

export default NftImage;
