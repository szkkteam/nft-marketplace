import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, Toolbar } from '@mui/material';
import React from 'react';

import LinkIcon from '@/components/LinkIcon';
import TokenListItem from '@/components/TokenListItem';

export interface HeaderProps {
  name: string;
  address: string;
  tokenId: string;
}

const Header = ({ address, name, tokenId }: HeaderProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Toolbar sx={{ display: 'flex' }}>
          <LinkIcon href={`/assets/${address}/${tokenId}`}>
            <ArrowBackIosIcon />
          </LinkIcon>
          <TokenListItem name={name} tokenId={tokenId} />
        </Toolbar>
      </Grid>
    </Grid>
  );
};

export default Header;
