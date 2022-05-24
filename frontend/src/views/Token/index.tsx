import React, { useState, useEffect } from 'react';

import PageLayout from '@/layout/PageLayout';
import SellToken from './components/SellToken'
import BuyForm from './components/BuyForm';

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


    return (
        <PageLayout>
            <div>token {address} - {tokenId}</div>
            {sameAccount && !hasOrder && <SellToken address={address} token={tokenId} />}
            {!sameAccount && hasOrder && <BuyForm address={address} token={tokenId} order={token.orders[0]}/>}            
        </PageLayout>
    )
}

export default Token;
