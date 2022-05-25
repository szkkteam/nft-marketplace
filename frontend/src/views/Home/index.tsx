import React from 'react';

import { Container, Grid } from '@mui/material'

import PageLayout from '@/layout/PageLayout';

import Hero from './components/Hero';
import CollectionTeaser from './components/CollectionTeaser';
import MintTeaser from './components/MintTeaser';


const Index = () => {
    return (
        <PageLayout marginTop={5}>
            <Container fixed >
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <Hero />
                    </Grid>
                    <Grid item xs={12}>
                        <CollectionTeaser />
                    </Grid>
                    <Grid item xs={12}>
                        <MintTeaser />
                    </Grid>
                </Grid>
            </Container>        
        </PageLayout>
    )
}

export default Index;