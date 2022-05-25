import React from 'react';

import { Container, Grid } from '@mui/material'

import PageLayout from '@/layout/PageLayout';

import Hero from './components/Hero';
import CollectionTeaser from './components/CollectionTeaser';
import MintTeaser from './components/MintTeaser';

import { AssetEntity, MintEntity } from '@/interfaces'

export interface IndexProps {
    assets: Array<AssetEntity>;
    mints: Array<MintEntity>;
}

const Index = ({assets, mints} : IndexProps) => {
    return (
        <PageLayout marginTop={5}>
            <Container fixed >
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <Hero />
                    </Grid>
                    <Grid item xs={12}>
                        <CollectionTeaser assets={assets}/>
                    </Grid>
                    <Grid item xs={12}>
                        <MintTeaser mints={mints}/>
                    </Grid>
                </Grid>
            </Container>        
        </PageLayout>
    )
}

export default Index;