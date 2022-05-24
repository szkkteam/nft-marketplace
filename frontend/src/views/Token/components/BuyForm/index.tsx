import React, { useState, useEffect } from 'react';
import Router from 'next/router'

import { Button } from '@mui/material'

import useHasAccount from '@/hooks/useHasAccount';
import useTakeOrder from '@/hooks/useTakeOrder';

import {
    Web3ReactProvider,
    useWeb3React,
  } from '@web3-react/core';

import { OrderEntity } from '@/interfaces/token';

export interface BuyFormProp {
    address: string;
    token: string;
    order: OrderEntity;
}

const BuyForm = ({address, token, order}: BuyFormProp) => {
    const { proxyAccount, isLoading } = useHasAccount();
    const { takeOrder } = useTakeOrder(address, token, order._id);
    
    const handleBuy = async () => {
        // Redirect if not registered
        if (!isLoading && !proxyAccount) {
            Router.push('/account')
        }

        const {
            listingTime,
            expirationTime,
            currentPrice,
            salt,
            r,
            s,
            v,
            maker: {
                address: makerAddress,
            }
        } = order;

        const signature = { v, r, s };

        try {
            await takeOrder(proxyAccount.address, makerAddress, currentPrice, listingTime, expirationTime, salt, signature);
        } catch(e) {
            console.log(e)
        }


    }
    //console.log(`token: ${JSON.stringify(order)}`)
    return (
        <Button disabled={isLoading} onClick={handleBuy}>
            Buy
        </Button>
    )
}

export default BuyForm;
