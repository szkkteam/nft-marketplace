import React, { useState, useEffect } from 'react';

import {
    Container,
    Grid,
    Box
} from '@mui/material'

import PageLayout from '@/layout/PageLayout';
import SellToken from './components/SellToken'
import BuyToken from './components/BuyToken';
import Preview from './components/Preview';
import Header from './components/Header';
import Actions from './components/Actions';

import {
    Web3ReactProvider,
    useWeb3React,
  } from '@web3-react/core';

import { TokenEntity } from '@/interfaces/token';



export interface TokenProp {
    address: string;
    token: TokenEntity;
    tokenId: string;
}

const Token = ({address, token, tokenId}: TokenProp) => {
    console.log(token)
    const [sameAccount, setSameAccount] = useState(false);
    const [hasOrder, setHasOrder] = useState(false);

    const { account } = useWeb3React<Web3ReactProvider>();
    const { owner } = token;


    useEffect(() => {
        if (account && owner) {
            setSameAccount(account === owner);
        }
        if ('orders' in token && token.orders.length > 0) {
            setHasOrder(true);
        }

    }, [account]);
    // TODO: Check if user owns the token and if the token is not already listed
    const sellButton = sameAccount && !hasOrder;
    const buyButton = !sameAccount && hasOrder;

    const getOwner = () => {
        return (
            <>
                <b>{sameAccount? 'You' : `${owner.substring(0, 6)}...${owner.substring(
        owner.length - 4,
        )}`}</b>
            </>
        )
    }


    return (
        <PageLayout>
            <Container fixed>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <Preview />
                    </Grid>
                    <Grid item xs={8}>
                        <Header name="Simple NFT" tokenId={tokenId} owner={
                            sameAccount? 'You' : `${owner.substring(0, 6)}...${owner.substring(owner.length - 4,)}`
                        }
                        />
                        <Box sx={{marginBottom: 2}} />
                        <Actions 
                            owned={sameAccount}
                            action={
                                <>
                                    {sellButton && <SellToken address={address} token={tokenId} />}
                                    {buyButton && <BuyToken address={address} token={tokenId} order={token.orders[0]}/>}
                                </>
                            }
                        />
                    </Grid>
                </Grid>
            </Container>
      
        </PageLayout>
    )
}

export default Token;
