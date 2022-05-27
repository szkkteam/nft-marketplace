// @ts-nocheck
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import React, { useState } from 'react';

import NftImage from '@/components/NftImage';
import useIERC721 from '@/hooks/useIERC721';
import useMint from '@/hooks/useMint';
import { MintEntity } from '@/interfaces';

export interface CollectionProps {
  mint: MintEntity;
}

const Collection = ({ mint }: CollectionProps) => {
  const { account } = useWeb3React<Web3ReactProvider>();
  const {
    name,
    slug,
    address,
    supply: { totalSupply: originalTotalSupply, maximumSupply },
  } = mint;

  const [totalSupply, setTotalSupply] = useState(originalTotalSupply);

  const { mint: onMint } = useMint(address);
  const { totalSupply: onTotalSupply } = useIERC721(address);

  const handleMint = async () => {
    await onMint('1');
    const newSupply = await onTotalSupply();
    console.log(newSupply);
    setTotalSupply(newSupply.toString());
  };

  return (
    <Card>
      <CardMedia sx={{ position: 'relative' }}>
        <NftImage height={160} />
      </CardMedia>
      <CardContent>
        <Box
          sx={{ marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}
        >
          <Typography variant="h6" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" component="p">
            by author
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Typography variant="body2" component="p">
          {totalSupply} / {maximumSupply}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" disabled={!account} onClick={handleMint}>
          Mint now
        </Button>
      </CardActions>
    </Card>
  );
};

export default Collection;
