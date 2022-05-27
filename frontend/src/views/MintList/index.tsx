import { Container, Grid } from '@mui/material';
import React from 'react';

import { MintEntity } from '@/interfaces';
import PageLayout from '@/layout/PageLayout';

import Collection from './components/Collection';
import Header from './components/Header';

interface MintListProps {
  mints: Array<MintEntity>;
}

const MintList = ({ mints }: MintListProps) => {
  // const router = useRouter();

  const renderAssets = () => {
    return mints.map((mint: MintEntity, key) => {
      return (
        <Grid item xs={6} sm={4} md={3} key={key}>
          <Collection mint={mint} />
        </Grid>
      );
    });
  };

  return (
    <PageLayout marginTop={5}>
      <Container>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item container xs={12} spacing={3}>
            {mints && renderAssets()}
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default MintList;
